import { Router } from 'express';
import moment from 'moment';

import { makeResponse, findProjectId, findTaskId, RESPONSE_MESSAGES } from '../../utils';
import { callOtherService, extractInformation, timeDifference } from '../../utils';
import { addTimesheetValidation } from '../../middlewares';
import { getToken } from '../../services';

const router = Router();

router.route('/')
  .post(addTimesheetValidation, async(req, res) => {
    try {
      const [projectKey, taskKey, startTime, endTime, description] = extractInformation(req.body.data);
      const date = moment().format('MM-DD-YYYY');
      const start = moment(startTime, ['hA', 'h:mma']).format('hh:mm A');
      const end = moment(endTime, ['hA', 'h:mma']).format('hh:mm A');
      const hours = timeDifference(start, end);
      const baseUrl = process.env.ZOHO_LINK;
      const portalId =  process.env.PORTAL_ID;
      const token = await getToken() as { token: string };
      const projectsIds = await callOtherService(`${baseUrl}/restapi/portal/${portalId}/projects/`, 'GET', `Zoho-oauthtoken ${token.token}`);
      const projectId = findProjectId(projectKey, projectsIds.projects);
      const taskIds = await callOtherService(`${baseUrl}/restapi/portal/${portalId}/projects/${projectId}/tasks/`, 'GET', `Zoho-oauthtoken ${token.token}`);
      const taskId = findTaskId(taskKey, taskIds.tasks);
      const response = await callOtherService(`${baseUrl}/restapi/portal/${portalId}/projects/${projectId}/tasks/${taskId}/logs/?bill_status=Billable&date=${date}&hours=${hours}&start_time=${start}&end_time=${end}&notes=${description}`, 'POST', `Zoho-oauthtoken ${token.token}`);

      return makeResponse(res, 200, true, RESPONSE_MESSAGES.timesheet_add, response);
    }catch(error) {
      const err = error as { message: string };
      return makeResponse(res, 400, false, err.message);
    }
  })

export const timesheetController = router;