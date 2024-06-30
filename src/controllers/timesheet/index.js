"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timesheetController = void 0;
const express_1 = require("express");
const moment_1 = __importDefault(require("moment-timezone"));
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const middlewares_1 = require("../../middlewares");
const services_1 = require("../../services");
const tokenFunction = require("../get-access-token")
const router = (0, express_1.Router)();
router.route('/')
    .post(middlewares_1.addTimesheetValidation, async (req, res) => {
    try {
        const [projectKey, taskKey, startTime, endTime, description] = (0, utils_2.extractInformation)(req.body.data);
        const date = (0, moment_1.default)().tz('Asia/Kolkata').format('MM-DD-YYYY');
        const start = (0, moment_1.default)(startTime, ['hA', 'h:mma']).format('hh:mm A');
        const end = (0, moment_1.default)(endTime, ['hA', 'h:mma']).format('hh:mm A');
        const hours = (0, utils_2.timeDifference)(start, end);
        const baseUrl = process.env.ZOHO_LINK;
        const portalId = process.env.PORTAL_ID;
        let token = await (0, services_1.getToken)();
        if( !token || (token && !token.token)) {
            token = await tokenFunction.getAccessToken();
        }
        const projectsIds = await (0, utils_2.callOtherService)(`${baseUrl}/restapi/portal/${portalId}/projects/`, 'GET', `Zoho-oauthtoken ${token.token}`);
        const projectId = (0, utils_1.findProjectId)(projectKey, projectsIds.projects);
        const taskIds = await (0, utils_2.callOtherService)(`${baseUrl}/restapi/portal/${portalId}/projects/${projectId}/tasks/`, 'GET', `Zoho-oauthtoken ${token.token}`);
        const taskId = (0, utils_1.findTaskId)(taskKey, taskIds.tasks);
        const response = await (0, utils_2.callOtherService)(`${baseUrl}/restapi/portal/${portalId}/projects/${projectId}/tasks/${taskId}/logs/?bill_status=Billable&date=${date}&hours=${hours}&start_time=${start}&end_time=${end}&notes=${description}`, 'POST', `Zoho-oauthtoken ${token.token}`);
        return (0, utils_1.makeResponse)(res, 200, true, utils_1.RESPONSE_MESSAGES.timesheet_add, response);
    }
    catch (error) {
        const err = error;
        if(err.message == "Cannot read properties of undefined (reading 'find')") {
            return (0, utils_1.makeResponse)(res, 400, false, 'Project or Task Not Found');
        }
        return (0, utils_1.makeResponse)(res, 400, false, err.message);
    }
});
exports.timesheetController = router;
