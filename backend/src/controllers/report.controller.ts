import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as reportService from '../services/report.service';

export const getMonthlyReport = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id;
        const report = await reportService.getMonthlySummary(userId);
        res.status(200).json(report);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getGroupReport = async (req: AuthRequest, res: Response) => {
    try {
        const { groupId } = req.params;
        const report = await reportService.getGroupSummary(groupId);
        res.status(200).json(report);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
