import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { signupSchema, loginSchema } from '../schemas/auth.schema';

export const register = async (req: Request, res: Response) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { user, accessToken, refreshToken } = await authService.register(validatedData);

        res.status(201).json({ user, accessToken, refreshToken });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { user, accessToken, refreshToken } = await authService.login(validatedData);

        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error: any) {
        res.status(401).json({ message: error.message || 'Login failed' });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

    try {
        const tokens = await authService.refreshTokens(refreshToken);
        res.status(200).json(tokens);
    } catch (error: any) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};
