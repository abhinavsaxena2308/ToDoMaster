import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'
import Modal from '../ui/Modal';
import { ArrowRightOnRectangleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useSharedTheme } from '../../contexts/SharedThemeContext';

export default function Navbar() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useSharedTheme();
    
    const handleLogout = () => {
        signOut();
        setIsLogoutModalOpen(false);
        navigate('/');
    };
    
    const getDisplayName = () => {
        if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
        if (user?.user_metadata?.name) return user.user_metadata.name;
        return user?.email || 'User';
    };

    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 shadow-sm transition-colors duration-200">
                <div className="flex items-center">
                    <Link to="/dashboard" className="flex items-center group">
                        <div className="relative">
                            <img src={logo} className="h-12 w-22 " alt="Task Flow Logo" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-200">
                            Task Flow
                        </span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200 transform hover:scale-105 active:scale-95`}
                    >
                        {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                    {user ? (
                        <>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {getDisplayName()}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsLogoutModalOpen(true)}
                                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                <span className="sr-only">Logout</span>
                                <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link 
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup"
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Confirm Logout"
                description="Are you sure you want to log out?"
            >
                <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsLogoutModalOpen(false)}
                        className="btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </Modal>
        </>
    );
}