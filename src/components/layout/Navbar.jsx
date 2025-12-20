import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import Modal from '../ui/Modal';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Navbar({ toggleSidebar }) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        // UI-only, no actual logout logic
        setIsLogoutModalOpen(false);
        console.log('Logout confirmed');
    };

    return (
        <>
            <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8 shadow-sm">
                <div className="flex items-center space-x-4">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 md:hidden"
                        onClick={toggleSidebar}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <Link to="/dashboard" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ToDoMaster
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
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