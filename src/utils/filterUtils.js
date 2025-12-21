import { isTaskOverdue } from './taskUtils';

/**
 * Filters tasks based on priority filters
 * @param {Array} tasks - Array of task objects
 * @param {Array} priorityFilters - Array of selected priority values
 * @returns {Array} - Filtered tasks
 */
export const filterByPriority = (tasks, priorityFilters) => {
    if (!priorityFilters || priorityFilters.length === 0) return tasks;
    return tasks.filter(task => priorityFilters.includes(task.priority));
};

/**
 * Filters tasks based on status filters
 * @param {Array} tasks - Array of task objects
 * @param {Array} statusFilters - Array of selected status values
 * @returns {Array} - Filtered tasks
 */
export const filterByStatus = (tasks, statusFilters) => {
    if (!statusFilters || statusFilters.length === 0) return tasks;
    
    // Normalize status values for comparison
    const normalizedStatusFilters = statusFilters.map(status => 
        status.toLowerCase()
    );
    
    return tasks.filter(task => 
        normalizedStatusFilters.includes(task.status.toLowerCase())
    );
};

/**
 * Filters tasks based on due date filter
 * @param {Array} tasks - Array of task objects
 * @param {String} dueDateFilter - Selected due date filter option
 * @returns {Array} - Filtered tasks
 */
export const filterByDueDate = (tasks, dueDateFilter) => {
    if (!dueDateFilter) return tasks;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
    
    switch (dueDateFilter) {
        case 'Today':
            return tasks.filter(task => {
                if (!task.due_date) return false;
                const taskDate = new Date(task.due_date);
                taskDate.setHours(0, 0, 0, 0);
                return taskDate.getTime() === today.getTime();
            });
            
        case 'This Week':
            return tasks.filter(task => {
                if (!task.due_date) return false;
                const taskDate = new Date(task.due_date);
                taskDate.setHours(0, 0, 0, 0);
                return taskDate >= today && taskDate <= endOfWeek;
            });
            
        case 'Overdue':
            return tasks.filter(task => isTaskOverdue(task));
            
        default:
            return tasks;
    }
};

/**
 * Searches tasks based on title and description
 * @param {Array} tasks - Array of task objects
 * @param {String} query - Search query
 * @returns {Array} - Filtered tasks
 */
export const searchTasks = (tasks, query) => {
    if (!query || query.trim() === '') return tasks;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return tasks.filter(task => {
        const titleMatch = task.title && task.title.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = task.description && task.description.toLowerCase().includes(normalizedQuery);
        return titleMatch || descriptionMatch;
    });
};

/**
 * Applies all filters to tasks
 * @param {Array} tasks - Array of task objects
 * @param {Object} filters - Object containing all filter states
 * @returns {Array} - Filtered tasks
 */
export const applyFilters = (tasks, filters) => {
    let filteredTasks = [...tasks];
    
    // Apply filters in sequence (AND logic)
    filteredTasks = filterByPriority(filteredTasks, filters.priorityFilters);
    filteredTasks = filterByStatus(filteredTasks, filters.statusFilters);
    filteredTasks = filterByDueDate(filteredTasks, filters.dueDateFilter);
    
    return filteredTasks;
};

/**
 * Applies search to tasks
 * @param {Array} tasks - Array of task objects
 * @param {String} query - Search query
 * @returns {Array} - Searched tasks
 */
export const applySearch = (tasks, query) => {
    return searchTasks(tasks, query);
};

/**
 * Applies both filters and search to tasks
 * @param {Array} tasks - Array of task objects
 * @param {Object} filters - Object containing all filter states
 * @param {String} query - Search query
 * @returns {Array} - Filtered and searched tasks
 */
export const applyFiltersAndSearch = (tasks, filters, query) => {
    // First apply filters
    const filteredTasks = applyFilters(tasks, filters);
    
    // Then apply search to filtered tasks
    return applySearch(filteredTasks, query);
};

/**
 * Checks if any filters are active
 * @param {Object} filters - Object containing all filter states
 * @returns {Boolean} - True if any filters are active
 */
export const hasActiveFilters = (filters) => {
    return (
        (filters.priorityFilters && filters.priorityFilters.length > 0) ||
        (filters.dueDateFilter && filters.dueDateFilter !== '') ||
        (filters.statusFilters && filters.statusFilters.length > 0)
    );
};

/**
 * Clears all filters
 * @returns {Object} - Object with cleared filter states
 */
export const clearFilters = () => {
    return {
        priorityFilters: [],
        dueDateFilter: '',
        statusFilters: []
    };
};