"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/timesheet', controllers_1.timesheetController);
router.get('/nitesh', (req, res) => res.send('hello nitesh'));
