import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useSharedTheme } from '../contexts/SharedThemeContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import logo from '../../public/logo.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useSharedTheme();

    // Debug function to test theme toggle
    const handleThemeToggle = () => {
        console.log('Theme toggle clicked');
        console.log('Current isDarkMode:', isDarkMode);
        toggleTheme();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            const { error } = await signIn({ email, password });
            if (error) throw error;
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]' : 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'}`}></div>
            </div>

            {/* Theme Toggle */}
            {/* Theme Toggle */}
            <div
                className="fixed top-4 right-4 z-50"
                style={{ position: 'fixed', top: '1rem', right: '1rem' }}
            >
                <button
                    onClick={handleThemeToggle}
                    className={`p-3 rounded-lg shadow-lg ${isDarkMode
                            ? 'bg-white/20 text-white hover:bg-white/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-all duration-200`}
                    style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isDarkMode ? (
                        <SunIcon className="h-5 w-5" />
                    ) : (
                        <MoonIcon className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Login Form */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className={`w-full max-w-md ${isDarkMode ? 'bg-white/5 backdrop-blur-lg border border-white/10' : 'bg-white/50 backdrop-blur-lg border border-gray-200/20'} rounded-2xl shadow-xl p-8`}>
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <img src={logo} className="h-20 w-20 object-contain" alt="Task Flow Logo" />
                        </div>
                        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Welcome Back</h2>
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sign in to your Task Flow account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full px-4 py-3 pr-12 rounded-lg border ${isDarkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200`}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
                                >
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 text-lg font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
