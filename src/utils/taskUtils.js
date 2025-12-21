/**
 * Determines if a task is overdue based on its due date and status
 * @param {Object} task - The task object to check
 * @returns {boolean} - True if the task is overdue, false otherwise
 */
export const isTaskOverdue = (task) => {
    // A task is overdue if:
    // 1. It's not completed (includes 'upcoming' and 'ongoing' statuses)
    // 2. Its due date is earlier than today (past dates only)
    
    if (task.status === 'completed') {
        return false;
    }
    
    if (!task.due_date) {
        return false;
    }
    
    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get the task's due date
    const dueDate = new Date(task.due_date);
    dueDate.setHours(0, 0, 0, 0);
    
    // Task is overdue if due date is before today
    return dueDate < today;
};

/**
 * Formats a date to show only YYYY-MM-DD without time
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    // Set time to midnight to avoid timezone issues
    d.setHours(0, 0, 0, 0);
    
    // Format as YYYY-MM-DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};