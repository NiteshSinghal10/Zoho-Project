"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccessToken = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const get_access_token_1 = require("../controllers/get-access-token");
const addAccessToken = () => {
    node_cron_1.default.schedule('*/55 * * * *', async () => {
        await (0, get_access_token_1.getAccessToken)();
        console.log('Added access token by cron job');
    });
};
exports.addAccessToken = addAccessToken;
