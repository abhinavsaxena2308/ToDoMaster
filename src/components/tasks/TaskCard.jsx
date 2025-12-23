import { useState } from 'react';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';
import TaskModal from './TaskModal';
import { ChevronDownIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import { isTaskOverdue, formatDate } from '../../utils/taskUtils';

const statusStyles = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

// Priority styles for visual indicators
const priorityStyles = {
    Low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function TaskCard({ task, onUpdateStatus, onDelete, isUpdating, isDeleting, onTaskStatusUpdate }) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Check if the task is overdue
    const isOverdue = isTaskOverdue(task);
    
    // Define styling for overdue tasks
    const cardClass = isOverdue 
        ? 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] border-2 border-red-500 dark:border-red-400' 
        : 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]';

    const handleProgressUpdate = (completed, total) => {
        const newProgress = total > 0 ? (completed / total) * 100 : 0;
        setProgress(newProgress);

        if (newProgress === 100 && task.status !== 'completed') {
            onUpdateStatus(task.id, 'completed');
        }
    };

    return (
        <>
            <div className={cardClass} role="article" aria-labelledby={`task-title-${task.id}`}>
                <div 
                    className="p-4 cursor-pointer" 
                    onClick={() => setIsTaskModalOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsTaskModalOpen(true);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isTaskModalOpen}
                    aria-controls={`task-details-${task.id}`}
                >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex flex-wrap items-start gap-2 min-w-0">
                            <h3 id={`task-title-${task.id}`} className="text-lg font-bold text-gray-900 dark:text-gray-100 break-words min-w-0">{task.title}</h3>
                            {/* Priority indicator badge */}
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityStyles[task.priority]} transition-all duration-200 whitespace-nowrap`}>
                                {task.priority}
                            </span>
                            {/* Overdue indicator */}
                            {isOverdue && (
                                <span className="flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse-subtle whitespace-nowrap">
                                    <ExclamationTriangleIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                                    <span className="hidden xs:inline">Overdue</span>
                                    <span className="xs:hidden">!</span>
                                </span>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 ml-0 sm:ml-2">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button 
                                        disabled={isUpdating}
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[task.status]} disabled:opacity-50 inline-flex items-center transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap`}
                                        aria-label={`Change task status, currently ${task.status}`}
                                    >
                                        {isUpdating && <Spinner size="sm" className="mr-2" aria-label="Updating status" />}
                                        {task.status}
                                    </Menu.Button>
                                </div>
                                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out transform opacity-0 scale-95 data-[open]:opacity-100 data-[open]:scale-100 sm:right-0 left-0 sm:left-auto" role="menu">
                                    <div className="px-1 py-1 " role="none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'upcoming'); }} 
                                                    className={`${active ? 'bg-emerald-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-150 transform active:scale-95`}
                                                    role="menuitem"
                                                >
                                                    Upcoming
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'ongoing'); }} 
                                                    className={`${active ? 'bg-emerald-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-150 transform active:scale-95`}
                                                    role="menuitem"
                                                >
                                                    Ongoing
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'completed'); }} 
                                                    className={`${active ? 'bg-emerald-500 text-white' : 'text-gray-900 dark:text-gray-100'} group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-150 transform active:scale-95`}
                                                    role="menuitem"
                                                >
                                                    Completed
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true); }} 
                                disabled={isDeleting}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-110 active:scale-90"
                                aria-label="Delete task"
                                title="Delete task"
                            >
                                {isDeleting ? (
                                    <Spinner size="sm" aria-label="Deleting task" />
                                ) : (
                                    <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors duration-200" />
                                )}
                            </button>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 break-words">{task.description}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-2">
                        <span className="break-words min-w-0 truncate">Due: {formatDate(task.dueDate || task.due_date)}</span>
                        <button 
                            className="-m-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 active:scale-90"
                            aria-label="View task details"
                            aria-expanded={isTaskModalOpen}
                        >
                            <ChevronDownIcon className="h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out" />
                        </button>
                    </div>
                    <div className="mt-4" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label={`Task progress: ${Math.round(progress)}%`}>
                        <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Task Details Modal */}
            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                task={task}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
                onTaskStatusUpdate={onTaskStatusUpdate}
            />
            
            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Task"
                description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
            >
                <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onDelete(task.id);
                            setIsDeleteModalOpen(false);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center transition-all duration-200 transform hover:scale-105 active:scale-95"
                        disabled={isDeleting}
                    >
                        {isDeleting && <Spinner size="sm" className="mr-2" />}
                        Delete Task
                    </button>
                </div>
            </Modal>
        </>
    );
}