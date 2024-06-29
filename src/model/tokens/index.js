"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tokenSchema = new mongoose_1.default.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, { timestamps: true });
const TOKEN = mongoose_1.default.model('Token', tokenSchema);
exports.TOKEN = TOKEN;
