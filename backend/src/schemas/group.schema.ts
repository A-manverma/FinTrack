import { z } from 'zod';

export const createGroupSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
});

export const addMemberSchema = z.object({
    email: z.string().email(),
    role: z.enum(['GROUP_ADMIN', 'MEMBER']).optional(),
});
