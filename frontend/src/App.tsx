import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';

function App() {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {isAuthenticated && <Navbar />}
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
                    <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/groups" element={isAuthenticated ? <Groups /> : <Navigate to="/login" />} />
                    <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
