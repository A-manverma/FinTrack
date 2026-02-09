import prisma from './prisma';

export const logAction = async (userId: string, action: string, entity: string, entityId: string) => {
    try {
        await prisma.auditLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
            },
        });
    } catch (error) {
        console.error('Failed to log audit action:', error);
    }
};
