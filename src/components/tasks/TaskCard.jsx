import { useState } from 'react';
import SubTaskList from './SubTaskList';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const statusStyles = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

export default function TaskCard({ task }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[task.status]}`}>
                        {task.status}
                    </span>
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
                    <SubTaskList subTasks={task.subTasks} />
                </div>
            )}
        </div>
    );
}