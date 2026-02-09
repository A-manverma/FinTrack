import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import { LayoutDashboard, PlusCircle, Users, BarChart3, LogOut } from 'lucide-react';

export default function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <nav className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                <Link to="/" className="text-2xl font-bold text-blue-600">Fintrak</Link>

                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="flex items-center gap-2 hover:text-blue-600 transition tracking-tight">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/groups" className="flex items-center gap-2 hover:text-blue-600 transition tracking-tight">
                        <Users size={18} /> Groups
                    </Link>
                    <Link to="/analytics" className="flex items-center gap-2 hover:text-blue-600 transition tracking-tight">
                        <BarChart3 size={18} /> Analytics
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500">Hi, {user?.name}</span>
                    <button
                        onClick={() => dispatch(logout())}
                        className="p-2 text-slate-400 hover:text-red-600 transition"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
