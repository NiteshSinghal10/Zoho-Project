"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponse = void 0;
const makeResponse = (res, status, success, message, data = {}, meta = {}) => {
    return res.status(status).json({ success, data: data, message: message, meta: meta });
};
exports.makeResponse = makeResponse;
