import { Router } from 'express';
import * as reportController from '../controllers/report.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/monthly', reportController.getMonthlyReport);
router.get('/group/:groupId', reportController.getGroupReport);

export default router;
