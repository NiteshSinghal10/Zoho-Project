"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../../services");
const getAccessToken = async () => {
    const url = process.env.ACCESS_URL;
    const refreshToken = process.env.REFRESH_TOKEN;
    const clienId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    ;
    const response = await (0, utils_1.callOtherService)(`${url}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clienId}&client_secret=${clientSecret}&grant_type=refresh_token`, 'POST');
    await (0, services_1.addToken)(response.access_token);
};
exports.getAccessToken = getAccessToken;
