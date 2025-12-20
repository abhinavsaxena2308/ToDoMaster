import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (isDesktop) {
            setIsSidebarOpen(true);
        } else {
            setIsSidebarOpen(false);
        }
    }, [isDesktop]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${isDesktop ? '' : 'flex'}`}>
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isDesktop={isDesktop} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isDesktop && isSidebarOpen ? 'md:ml-64' : (isDesktop ? 'md:ml-20' : '')}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}