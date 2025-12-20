import { useState } from 'react';
import SubTaskList from './SubTaskList';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';

const statusStyles = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export default function TaskCard({ task, onUpdateStatus, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[task.status]}`}>
                                    {task.status}
                                </Menu.Button>
                            </div>
                            <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'upcoming'); }} className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                Upcoming
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'ongoing'); }} className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                Ongoing
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'completed'); }} className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                                Completed
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Menu>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Due: {task.dueDate}</span>
                    <button className="-m-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} />
                    </button>
                </div>
                <div className="mt-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="px-4 pb-4">
                    <SubTaskList taskId={task.id} />
                </div>
            )}
        </div>
    );
}