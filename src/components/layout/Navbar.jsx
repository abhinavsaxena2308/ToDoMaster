import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'
import Modal from '../ui/Modal';
import { ArrowRightOnRectangleIcon, SunIcon, MoonIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useSharedTheme } from '../../contexts/SharedThemeContext';

export default function Navbar() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useSharedTheme();
    
    const handleLogout = () => {
        signOut();
        setIsLogoutModalOpen(false);
        setIsProfileDropdownOpen(false); // Close dropdown when logging out
        navigate('/');
    };
    
    const getDisplayName = () => {
        if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
        if (user?.user_metadata?.name) return user.user_metadata.name;
        return user?.email || 'User';
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

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
                        <div className="flex items-center space-x-4">
                            {/* Profile dropdown */}
                            <div className="relative profile-dropdown">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                                    aria-expanded={isProfileDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <UserCircleIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">
                                        {getDisplayName()}
                                    </span>
                                    <ChevronDownIcon 
                                        className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                                
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200 dark:border-gray-700">
                                        <div className="py-1" role="menu">
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {getDisplayName()}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div className="px-4 py-2">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {user.app_metadata?.provider ? `Signed in with ${user.app_metadata.provider}` : 'Email Password'}
                                                </p>
                                            </div>
                                            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                                                <button
                                                    onClick={() => setIsLogoutModalOpen(true)}
                                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center"
                                                    role="menuitem"
                                                >
                                                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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