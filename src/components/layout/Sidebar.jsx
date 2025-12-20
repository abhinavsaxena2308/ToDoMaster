import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarIcon, PlayIcon, CheckCircleIcon, ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Upcoming Tasks', href: '#', icon: CalendarIcon, count: '5', current: true },
    { name: 'Ongoing Tasks', href: '#', icon: PlayIcon, count: '3', current: false },
    { name: 'Completed Tasks', href: '#', icon: CheckCircleIcon, count: '12', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ isOpen, setIsOpen, isDesktop }) {
    const [activeNav, setActiveNav] = useState('Upcoming Tasks');

    const handleNavClick = (itemName) => {
        setActiveNav(itemName);
        if (!isDesktop) {
            setIsOpen(false);
        }
    };

    const SidebarContent = () => (
        <div className={`h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${isDesktop ? (isOpen ? 'w-64' : 'w-20') : 'w-64'}`}>
             <div className="flex items-center justify-between h-16 flex-shrink-0 px-4">
                <Link to="/dashboard" className="flex items-center">
                    <img src="/logo.png" alt="ToDoMaster Logo" className="h-8 w-auto" />
                    {isOpen && <span className={`text-xl font-bold text-gray-800 dark:text-white ml-2`}>ToDoMaster</span>}
                </Link>
                {!isDesktop && (
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                )}
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => handleNavClick(item.name)}
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
                            {isOpen && <span className="flex-1">{item.name}</span>}
                            {isOpen && (
                                <span
                                    className={classNames(
                                        item.name === activeNav ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600',
                                        'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                                    )}
                                >
                                    {item.count}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>
            </div>
            {isDesktop && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <ChevronDoubleLeftIcon className={`h-6 w-6 transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
                    </button>
                </div>
            )}
        </div>
    );

    if (!isDesktop) {
        return (
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setIsOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full">
                                <SidebarContent />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }

    return (
        <div className="fixed inset-y-0 left-0 z-30">
            <SidebarContent />
        </div>
    );
}