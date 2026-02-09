import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const expenseSchema = z.object({
    amount: z.number().positive(),
    description: z.string().min(3),
    type: z.enum(['PERSONAL', 'FAMILY', 'GROUP']),
    category: z.enum(['FOOD', 'RENT', 'GROCERY', 'TRAVEL', 'UTILITY', 'ENTERTAINMENT', 'OTHER']),
    payerId: z.string(),
});

export default function ExpenseForm({ onSuccess }: { onSuccess: () => void }) {
    const { user } = useSelector((state: RootState) => state.auth);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            type: 'PERSONAL',
            category: 'OTHER',
            payerId: user?.id,
        }
    });

    const onSubmit = async (data: any) => {
        try {
            await api.post('/expenses', data);
            reset();
            onSuccess();
        } catch (err) {
            console.error('Failed to add expense');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                    <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message as string}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select {...register('category')} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                        {['FOOD', 'RENT', 'GROCERY', 'TRAVEL', 'UTILITY', 'ENTERTAINMENT', 'OTHER'].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input {...register('description')} placeholder="e.g. Lunch with friends" className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message as string}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select {...register('type')} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
                    <option value="PERSONAL">Personal</option>
                    <option value="FAMILY">Family</option>
                    <option value="GROUP">Group</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold transition">
                Add Expense
            </button>
        </form>
    );
}
