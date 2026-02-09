import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as expenseService from '../services/expense.service';
import { createExpenseSchema, updateExpenseSchema } from '../schemas/expense.schema';

export const addExpense = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = createExpenseSchema.parse(req.body);
        const userId = req.user!.id;
        const expense = await expenseService.createExpense(validatedData, userId);
        res.status(201).json(expense);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getGroupExpenses = async (req: AuthRequest, res: Response) => {
    try {
        const { groupId } = req.params;
        const expenses = await expenseService.getGroupExpenses(groupId);
        res.status(200).json(expenses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserExpenses = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const expenses = await expenseService.getUserExpenses(userId);
        res.status(200).json(expenses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = updateExpenseSchema.parse(req.body);
        const expense = await expenseService.updateExpense(id, validatedData);
        res.status(200).json(expense);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await expenseService.deleteExpense(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
