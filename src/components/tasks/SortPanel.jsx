import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export default function SortPanel({ 
    sortBy, 
    setSortBy, 
    sortDirection, 
    setSortDirection,
    onClose 
}) {
    const sortOptions = [
        { id: 'created_at', label: 'Creation Date' },
        { id: 'due_date', label: 'Due Date' },
        { id: 'priority', label: 'Priority' },
        { id: 'progress', label: 'Progress' }
    ];

    const handleSortChange = (optionId) => {
        if (sortBy === optionId) {
            // Toggle direction if same option is selected
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Change sort option and set default direction
            setSortBy(optionId);
            setSortDirection('desc'); // Default to descending for most options
        }
    };

    return (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 sort-panel">
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Sort Tasks</h3>
                
                <div className="space-y-2">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSortChange(option.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-md ${
                                sortBy === option.id
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                        >
                            <span>{option.label}</span>
                            {sortBy === option.id && (
                                <span>
                                    {sortDirection === 'asc' ? (
                                        <ChevronUpIcon className="h-4 w-4" />
                                    ) : (
                                        <ChevronDownIcon className="h-4 w-4" />
                                    )}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            setSortBy('created_at');
                            setSortDirection('desc');
                        }}
                        className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
}