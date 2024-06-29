"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeDifference = exports.findTaskId = exports.findProjectId = exports.extractInformation = exports.callOtherService = void 0;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const callOtherService = async (url, method = 'GET', token = '', params, body) => {
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
        const response = await (0, axios_1.default)(config);
        return response.data;
    }
    catch (error) {
        const err = error;
        return err.message;
    }
};
exports.callOtherService = callOtherService;
const extractInformation = (data) => {
    const dataArray = data.split(',');
    const projectId = dataArray[0].trim();
    const taskId = dataArray[1].trim();
    const startTime = dataArray[2].trim();
    const endTime = dataArray[3].trim();
    const description = dataArray[4].trim();
    return [projectId, taskId, startTime, endTime, description];
};
exports.extractInformation = extractInformation;
const findProjectId = (key, data) => {
    let projectId;
    data.find((project) => {
        if (project.key === key) {
            projectId = project.id_string;
        }
    });
    return projectId;
};
exports.findProjectId = findProjectId;
const findTaskId = (key, data) => {
    let taskId;
    data.find((task) => {
        if (task.key === key) {
            taskId = task.id_string;
        }
    });
    return taskId;
};
exports.findTaskId = findTaskId;
const timeDifference = (start, end) => {
    const startTime = (0, moment_1.default)(start, 'hh:mm A');
    const endTime = (0, moment_1.default)(end, 'hh:mm A');
    const duration = moment_1.default.duration(endTime.diff(startTime));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const formattedDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return formattedDifference;
};
exports.timeDifference = timeDifference;
