import { useEffect, useState } from 'react';
import api from '../api/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea', '#0891b2', '#4b5563'];

export default function Analytics() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/reports/monthly');
                setData(res.data);
            } catch (err) {
                console.error('Failed to fetch analytics');
            }
        };
        fetchData();
    }, []);

    const chartData = data?.categoryTotals
        ? Object.keys(data.categoryTotals).map(key => ({
            name: key,
            value: data.categoryTotals[key]
        }))
        : [];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <BarChart3 className="text-blue-600" /> Expense Analytics
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <PieChartIcon size={20} className="text-blue-500" /> Category Breakdown
                    </h3>
                    <div className="h-80">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-500">No data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-blue-500" /> Spending Overview
                    </h3>
                    <div className="h-80">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-500">No data available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
