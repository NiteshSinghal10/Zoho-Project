import { Router } from 'express';

import { timesheetController } from '../controllers';

const router = Router();

router.use('/timesheet', timesheetController)

export { router };