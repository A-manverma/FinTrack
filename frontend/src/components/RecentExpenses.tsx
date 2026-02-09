import { useEffect, useState } from 'react';
import api from '../api/api';
import { IndianRupee, Clock } from 'lucide-react';

export default function RecentExpenses({ refreshKey }: { refreshKey: number }) {
    const [expenses, setExpenses] = useState<any[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await api.get('/expenses/user');
                setExpenses(res.data.slice(0, 10)); // Show last 10
            } catch (err) {
                console.error('Failed to fetch expenses');
            }
        };
        fetchExpenses();
    }, [refreshKey]);

    if (expenses.length === 0) {
        return <p className="text-slate-500 italic">No expenses recorded yet.</p>;
    }

    return (
        <div className="space-y-3">
            {expenses.map((expense) => (
                <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-sm transition"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <IndianRupee size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{expense.description}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock size={12} /> {new Date(expense.date).toLocaleDateString()} • {expense.category}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">₹{expense.amount}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{expense.type}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
