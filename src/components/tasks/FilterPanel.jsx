import { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function FilterPanel({ 
    priorityFilters, 
    setPriorityFilters, 
    dueDateFilter, 
    setDueDateFilter, 
    statusFilters, 
    setStatusFilters,
    onClose 
}) {
    const panelRef = useRef(null);

    const priorityOptions = ['Low', 'Medium', 'High'];
    const dueDateOptions = ['Today', 'This Week', 'Overdue'];
    const statusOptions = ['Upcoming', 'Ongoing', 'Completed'];

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const togglePriorityFilter = (priority) => {
        if (priorityFilters.includes(priority)) {
            setPriorityFilters(priorityFilters.filter(p => p !== priority));
        } else {
            setPriorityFilters([...priorityFilters, priority]);
        }
    };

    const toggleStatusFilter = (status) => {
        if (statusFilters.includes(status)) {
            setStatusFilters(statusFilters.filter(s => s !== status));
        } else {
            setStatusFilters([...statusFilters, status]);
        }
    };

    const handleDueDateChange = (filter) => {
        setDueDateFilter(filter === dueDateFilter ? '' : filter);
    };

    const clearAllFilters = () => {
        setPriorityFilters([]);
        setDueDateFilter('');
        setStatusFilters([]);
    };

    return (
        <div 
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 filter-panel"
        >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filter Tasks</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Priority Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</h4>
                    <div className="space-y-2">
                        {priorityOptions.map((priority) => (
                            <label key={priority} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={priorityFilters.includes(priority)}
                                    onChange={() => togglePriorityFilter(priority)}
                                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{priority}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Due Date Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</h4>
                    <div className="space-y-2">
                        {dueDateOptions.map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="radio"
                                    name="dueDate"
                                    checked={dueDateFilter === option}
                                    onChange={() => handleDueDateChange(option)}
                                    className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h4>
                    <div className="space-y-2">
                        {statusOptions.map((status) => (
                            <label key={status} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={statusFilters.includes(status)}
                                    onChange={() => toggleStatusFilter(status)}
                                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <button
                    onClick={clearAllFilters}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                >
                    Clear All
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}