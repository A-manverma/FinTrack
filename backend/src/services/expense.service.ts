import prisma from '../utils/prisma';

export const createExpense = async (data: any, ownerId: string) => {
    return await prisma.expense.create({
        data: {
            ...data,
            ownerId,
            date: data.date ? new Date(data.date) : new Date(),
        },
    });
};

export const getGroupExpenses = async (groupId: string) => {
    return await prisma.expense.findMany({
        where: { groupId },
        include: {
            owner: { select: { name: true } },
            payer: { select: { name: true } },
        },
        orderBy: { date: 'desc' },
    });
};

export const getUserExpenses = async (userId: string) => {
    return await prisma.expense.findMany({
        where: { ownerId: userId },
        include: {
            group: { select: { name: true } },
        },
        orderBy: { date: 'desc' },
    });
};

export const updateExpense = async (id: string, data: any) => {
    return await prisma.expense.update({
        where: { id },
        data,
    });
};

export const deleteExpense = async (id: string) => {
    return await prisma.expense.delete({
        where: { id },
    });
};
