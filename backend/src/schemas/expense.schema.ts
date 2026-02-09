import { z } from 'zod';

export const createExpenseSchema = z.object({
    amount: z.number().positive(),
    description: z.string().optional(),
    date: z.string().optional(),
    type: z.enum(['PERSONAL', 'FAMILY', 'GROUP']),
    category: z.enum(['FOOD', 'RENT', 'GROCERY', 'TRAVEL', 'UTILITY', 'ENTERTAINMENT', 'OTHER']),
    payerId: z.string(),
    groupId: z.string().optional(),
});

export const updateExpenseSchema = z.object({
    amount: z.number().positive().optional(),
    description: z.string().optional(),
    category: z.enum(['FOOD', 'RENT', 'GROCERY', 'TRAVEL', 'UTILITY', 'ENTERTAINMENT', 'OTHER']).optional(),
});
