"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbLoader = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbLoader = async () => {
    try {
        await mongoose_1.default.connect(String(process.env.MONGO_URL));
        console.log('DataBase connected');
    }
    catch (error) {
        console.log(error);
    }
};
exports.dbLoader = dbLoader;
