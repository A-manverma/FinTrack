import { Router } from 'express';
import * as groupController from '../controllers/group.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', groupController.createGroup);
router.get('/', groupController.listGroups);
router.post('/:id/members', groupController.addMember);

export default router;
