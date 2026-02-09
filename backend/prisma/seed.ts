import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Sample User
    const user = await prisma.user.upsert({
        where: { email: 'user@fintrak.com' },
        update: {},
        create: {
            email: 'user@fintrak.com',
            name: 'Fintrak User',
            password: hashedPassword,
        },
    });

    // Create Family Group
    const group = await prisma.group.create({
        data: {
            name: 'Happy Family',
            description: 'Monthly household expenses',
            members: {
                create: {
                    userId: user.id,
                    role: 'GROUP_ADMIN',
                },
            },
        },
    });

    // Add Sample Expenses
    await prisma.expense.createMany({
        data: [
            { amount: 50, description: 'Tea & Snacks', category: 'FOOD', type: 'PERSONAL', ownerId: user.id, payerId: user.id },
            { amount: 1500, description: 'Electricity Bill', category: 'UTILITY', type: 'FAMILY', ownerId: user.id, payerId: user.id, groupId: group.id },
            { amount: 300, description: 'Auto Fare', category: 'TRAVEL', type: 'PERSONAL', ownerId: user.id, payerId: user.id },
        ],
    });

    console.log('Seed data created successfully');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
