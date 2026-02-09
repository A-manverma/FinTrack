import { useEffect, useState } from 'react';
import api from '../api/api';
import { Users, Plus, UserPlus, ArrowRight } from 'lucide-react';

export default function Groups() {
    const [groups, setGroups] = useState<any[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const fetchGroups = async () => {
        try {
            const res = await api.get('/groups');
            setGroups(res.data);
        } catch (err) {
            console.error('Failed to fetch groups');
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/groups', { name: newGroupName });
            setNewGroupName('');
            setShowCreate(false);
            fetchGroups();
        } catch (err) {
            console.error('Failed to create group');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="text-blue-600" /> Your Groups
                </h1>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={20} /> New Group
                </button>
            </div>

            {showCreate && (
                <form onSubmit={handleCreateGroup} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 max-w-lg animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold mb-3">Create New Group</h3>
                    <div className="flex gap-2">
                        <input
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder="e.g. Dream Home, Trip to Goa"
                            className="flex-1 p-2 border rounded dark:bg-slate-700 dark:border-slate-600"
                            required
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Create</button>
                    </div>
                </form>
            )}

            {groups.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500">
                    <Users size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No groups yet. Start by creating one for your family or friends!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <div key={group.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold group-hover:text-blue-600 transition">{group.name}</h3>
                                <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-full font-medium">
                                    {group.members.length} members
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-6">{group.description || 'Shared expense tracking for this group.'}</p>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
                                <div className="flex -space-x-2">
                                    {group.members.slice(0, 3).map((m: any) => (
                                        <div key={m.id} title={m.user.name} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-slate-800 uppercase">
                                            {m.user.name[0]}
                                        </div>
                                    ))}
                                    {group.members.length > 3 && (
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-slate-800">
                                            +{group.members.length - 3}
                                        </div>
                                    )}
                                </div>
                                <button className="text-blue-600 hover:translate-x-1 transition flex items-center gap-1 text-sm font-semibold">
                                    View Detail <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
