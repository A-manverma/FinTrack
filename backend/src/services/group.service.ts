import prisma from '../utils/prisma';

export const createGroup = async (data: any, userId: string) => {
    return await prisma.group.create({
        data: {
            name: data.name,
            description: data.description,
            members: {
                create: {
                    userId: userId,
                    role: 'GROUP_ADMIN',
                },
            },
        },
        include: {
            members: true,
        },
    });
};

export const getUserGroups = async (userId: string) => {
    return await prisma.group.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
};

export const addMember = async (groupId: string, data: any) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error('User not found');

    return await prisma.groupMember.create({
        data: {
            groupId,
            userId: user.id,
            role: data.role || 'MEMBER',
        },
    });
};
