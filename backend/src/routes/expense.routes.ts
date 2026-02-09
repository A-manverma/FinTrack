import { Router } from 'express';
import * as expenseController from '../controllers/expense.controller';
import { authenticate, checkOwnership } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', expenseController.addExpense);
router.get('/user', expenseController.getUserExpenses);
router.get('/group/:groupId', expenseController.getGroupExpenses);

// Only owners can update/delete
router.put('/:id', checkOwnership('expense'), expenseController.updateExpense);
router.delete('/:id', checkOwnership('expense'), expenseController.deleteExpense);

export default router;
