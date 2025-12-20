import { useState } from 'react';
import { CalendarIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Upcoming Tasks', href: '#', icon: CalendarIcon, count: '5', current: true },
    { name: 'Ongoing Tasks', href: '#', icon: PlayIcon, count: '3', current: false },
    { name: 'Completed Tasks', href: '#', icon: CheckCircleIcon, count: '12', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ isOpen }) {
    const [activeNav, setActiveNav] = useState('Upcoming Tasks');

    return (
        <div className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
                {/* Placeholder for logo when sidebar is open/closed */}
                <div className={`text-2xl font-bold text-emerald-600 dark:text-emerald-500 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    TM
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveNav(item.name)}
                            className={classNames(
                                item.name === activeNav
                                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150'
                            )}
                        >
                            <item.icon
                                className={classNames(
                                    item.name === activeNav ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                                    'mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150'
                                )}
                                aria-hidden="true"
                            />
                            <span className={`flex-1 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{item.name}</span>
                            <span
                                className={classNames(
                                    item.name === activeNav ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600',
                                    `ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`
                                )}
                            >
                                {item.count}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}