import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function QuickAddTask({ onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    // Focus the title input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCancel();
            }
            if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [title, dueDate, priority]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate title (required field)
        if (!title.trim()) {
            setError('Task title is required');
            return;
        }
        
        // Submit the task with 'upcoming' status
        onSubmit({
            title: title.trim(),
            due_date: dueDate || null,
            priority,
            status: 'upcoming'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Quick Add Task</h3>
                        <button 
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label="Close"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="quick-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Task Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                ref={inputRef}
                                type="text"
                                id="quick-title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (error && e.target.value.trim()) {
                                        setError('');
                                    }
                                }}
                                className={`w-full rounded-md border ${
                                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white`}
                                placeholder="What needs to be done?"
                            />
                            {error && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="quick-due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="quick-due-date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="quick-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Priority
                                </label>
                                <select
                                    id="quick-priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}