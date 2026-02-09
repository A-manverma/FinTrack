import { useEffect, useState } from 'react';
import api from '../api/api';
import ExpenseForm from '../components/ExpenseForm';
import RecentExpenses from '../components/RecentExpenses';
import { IndianRupee, TrendingUp, Users as UsersIcon } from 'lucide-react';

export default function Dashboard() {
    const [summary, setSummary] = useState<any>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await api.get('/reports/monthly');
                setSummary(res.data);
            } catch (err) {
                console.error('Failed to fetch summary');
            }
        };
        fetchSummary();
    }, [refresh]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm font-medium">Monthly Total</p>
                        <h3 className="text-3xl font-bold mt-1">₹{summary?.total || 0}</h3>
                    </div>
                    <IndianRupee size={40} className="opacity-30" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Expenses Logged</p>
                        <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{summary?.count || 0}</h3>
                    </div>
                    <TrendingUp size={40} className="text-green-500 opacity-30" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Groups</p>
                        <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">-</h3>
                    </div>
                    <UsersIcon size={40} className="text-blue-500 opacity-30" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-600" /> Quick Add Expense
                    </h2>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                        <ExpenseForm onSuccess={() => setRefresh(prev => prev + 1)} />
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-600" /> Recent Transactions
                    </h2>
                    <RecentExpenses refreshKey={refresh} />
                </section>
            </div>
        </div>
    );
}
