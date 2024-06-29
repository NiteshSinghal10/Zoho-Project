import axios from 'axios';
import moment from 'moment';

export const callOtherService = async (url: string, method: 'GET' | 'PUT' | 'POST' | 'DELETE' = 'GET', token: string = '',params?: any, body?: any) => {
  try {
    const headers = {
      'Authorization': token,
      'Content-Type': 'application/json',
    };

    const config = {
      headers,
      method,
      url,
      params,
      data: body,
    };

    const response = await axios(config);
    return response.data;
  }catch(error) {
    const err = error as { message: string };
    return err.message;
  }
}

export const extractInformation = (data: string) => {
  const dataArray = data.split(',');
  const projectId = dataArray[0].trim();
  const taskId = dataArray[1].trim();
  const startTime = dataArray[2].trim();
  const endTime = dataArray[3].trim();
  const description = dataArray[4].trim();
  return [projectId, taskId, startTime, endTime, description];
}

export const findProjectId = (key:string, data: any[]) => {
  let projectId;
  data.find((project: any) => {
    if(project.key === key) {
      projectId = project.id_string;
    }
  });
  return projectId;
}

export const findTaskId = (key:string, data: any[]) => {
  let taskId;
  data.find((task: any) => {
    if(task.key === key) {
      taskId = task.id_string;
    }
  })
  return taskId;
}

export const timeDifference = (start: string, end: string) => {
  const startTime = moment(start, 'hh:mm A');
  const endTime = moment(end, 'hh:mm A');

  const duration = moment.duration(endTime.diff(startTime));
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const formattedDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedDifference;
}