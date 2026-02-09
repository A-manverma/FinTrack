import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export const register = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role || 'USER',
        },
    });

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const login = async (data: any) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshTokens = async (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string; role: string };
    const accessToken = generateAccessToken(decoded.id, decoded.role);
    const refreshToken = generateRefreshToken(decoded.id, decoded.role);

    return { accessToken, refreshToken };
};

const generateAccessToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET!, { expiresIn: REFRESH_TOKEN_EXPIRY });
};
