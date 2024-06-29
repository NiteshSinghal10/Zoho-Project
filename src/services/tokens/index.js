"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.addToken = void 0;
const model_1 = require("../../model");
const addToken = (token) => new Promise((resolve, reject) => model_1.TOKEN.create({ token })
    .then(resolve)
    .catch(reject));
exports.addToken = addToken;
const getToken = () => new Promise((resolve, reject) => model_1.TOKEN.findOne()
    .sort({ updatedAt: -1 })
    .then(resolve)
    .catch(reject));
exports.getToken = getToken;
