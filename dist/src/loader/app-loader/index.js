"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLoader = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const appLoader = async (app, router) => {
    try {
        const port = process.env.PORT;
        app.use((0, morgan_1.default)('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use('/api', router);
        app.use((req, res) => {
            res.status(404)
                .send({
                success: false,
                data: undefined,
                message: 'the resource you are looking for is not found.'
            });
        });
        app.listen(port, () => console.log(`Server is running on port: ${port}`));
    }
    catch (error) {
        console.log(error);
    }
};
exports.appLoader = appLoader;
