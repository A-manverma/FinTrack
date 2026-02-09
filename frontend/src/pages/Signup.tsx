import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/api';
import { setCredentials } from '../store/slices/authSlice';

const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupForm) => {
        try {
            const res = await api.post('/auth/register', data);
            dispatch(setCredentials(res.data));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join Fintrak</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input {...register('name')} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input {...register('email')} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input type="password" {...register('password')} className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600" />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold transition">
                    Create Account
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
    );
}
