"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTimesheetValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const makeResponse_1 = require("../../utils/makeResponse");
const addTimesheetValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        data: joi_1.default.string()
            .required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return (0, makeResponse_1.makeResponse)(res, 400, false, error.message);
    }
    next();
};
exports.addTimesheetValidation = addTimesheetValidation;
