import prisma from '../utils/prisma';

export const getMonthlySummary = async (userId: string) => {
    const expenses = await prisma.expense.findMany({
        where: { ownerId: userId },
        select: {
            amount: true,
            category: true,
            date: true,
        },
    });

    // Simple aggregation logic (can be expanded)
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((exp) => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    return {
        total: expenses.reduce((sum, exp) => sum + exp.amount, 0),
        categoryTotals,
        count: expenses.length,
    };
};

export const getGroupSummary = async (groupId: string) => {
    const expenses = await prisma.expense.findMany({
        where: { groupId },
        select: {
            amount: true,
            payerId: true,
            payer: { select: { name: true } },
        },
    });

    const payerTotals: Record<string, { name: string; total: number }> = {};
    expenses.forEach((exp) => {
        if (!payerTotals[exp.payerId]) {
            payerTotals[exp.payerId] = { name: exp.payer.name, total: 0 };
        }
        payerTotals[exp.payerId].total += exp.amount;
    });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return {
        total,
        payerTotals: Object.values(payerTotals),
    };
};
