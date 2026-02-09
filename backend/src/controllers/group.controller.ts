import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as groupService from '../services/group.service';
import { createGroupSchema, addMemberSchema } from '../schemas/group.schema';

export const createGroup = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = createGroupSchema.parse(req.body);
        const userId = req.user!.id;
        const group = await groupService.createGroup(validatedData, userId);
        res.status(201).json(group);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listGroups = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const groups = await groupService.getUserGroups(userId);
        res.status(200).json(groups);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addMember = async (req: AuthRequest, res: Response) => {
    try {
        const { id: groupId } = req.params;
        const validatedData = addMemberSchema.parse(req.body);
        const member = await groupService.addMember(groupId, validatedData);
        res.status(200).json(member);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
