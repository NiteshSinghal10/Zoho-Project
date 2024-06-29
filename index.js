"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const loader_1 = require("./src/loader");
const router_1 = require("./src/router");
const crons_1 = require("./src/crons");
const getAccessToken = require('./src/controllers/get-access-token');
getAccessToken();
dotenv_1.default.config();
(0, crons_1.addAccessToken)();
process.on('uncaughtException', err => {
    console.log(' UNCAUGHT EXCEPTION ');
    console.log('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log(' UNHANDLED REJECTION ');
    console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
});
const app = (0, express_1.default)();
(0, loader_1.dbLoader)()
    .then(() => (0, loader_1.appLoader)(app, router_1.router))
    .catch(err => console.log(err));
