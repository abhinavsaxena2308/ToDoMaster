import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'
import Modal from '../ui/Modal';
import { ArrowRightOnRectangleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useSharedTheme } from '../../contexts/SharedThemeContext';

export default function Navbar() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useSharedTheme();
    const handleLogout = () => {
        signOut();
        setIsLogoutModalOpen(false);
        navigate('/');
    };

    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 shadow-sm">
                <div className="flex items-center">
                    <Link to="/dashboard" className="flex items-center group">
                        <div className="relative">
                            <img src={logo} className="h-12 w-22 " alt="Task Flow Logo" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Task Flow
                        </span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
                    >
                        {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                        <span className="sr-only">Logout</span>
                        <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </header>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Confirm Logout"
                description="Are you sure you want to log out?"
            >
                <div className="mt-4 flex justify-end space-x-2">
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
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </Modal>
        </>
    );
}