import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import TaskList from '../components/tasks/TaskList';
import AddTask from '../components/tasks/AddTask';
import QuickAddTask from '../components/tasks/QuickAddTask';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/toast/ToastContext';
import { PlusCircleIcon, PlusIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { applyFilters, hasActiveFilters, clearFilters, applyFiltersAndSearch } from '../utils/filterUtils';
import FilterPanel from '../components/tasks/FilterPanel';

export default function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ongoing');
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [updatingTaskIds, setUpdatingTaskIds] = useState(new Set());
    const [deletingTaskIds, setDeletingTaskIds] = useState(new Set());
    
    // Filter states
    const [priorityFilters, setPriorityFilters] = useState([]); // Multi-select: 'Low', 'Medium', 'High'
    const [dueDateFilter, setDueDateFilter] = useState(''); // Single-select: 'Today', 'This Week', 'Overdue'
    const [statusFilters, setStatusFilters] = useState([]); // Multi-select: 'Upcoming', 'Ongoing', 'Completed'
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false); // State for filter panel
    
    // Search state
    const [searchQuery, setSearchQuery] = useState(''); // Search input value
    
    const toast = useToast();

    const fetchTasks = async () => {
        setIsLoading(true);
        
        // First, fetch all tasks for the user
        const { data: tasksData, error: fetchError } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error('Error fetching tasks:', fetchError);
            toast.error('Error', 'Failed to fetch tasks.');
            setIsLoading(false);
            return;
        }

        // Identify tasks that need status updates
        // Criteria: status is 'upcoming' AND due_date is today or earlier
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of day for comparison
        
        const tasksToUpdate = tasksData.filter(task => {
            // Skip if task is already completed
            if (task.status === 'completed') return false;
            
            // Only consider upcoming tasks
            if (task.status !== 'upcoming') return false;
            
            // Check if due_date is today or earlier
            if (task.due_date) {
                const dueDate = new Date(task.due_date);
                dueDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
                return dueDate <= today;
            }
            
            return false;
        });

        // Update eligible tasks to 'ongoing' status
        if (tasksToUpdate.length > 0) {
            const taskIds = tasksToUpdate.map(task => task.id);
            
            const { error: updateError } = await supabase
                .from('tasks')
                .update({ status: 'ongoing' })
                .in('id', taskIds);
                
            if (updateError) {
                console.error('Error updating task statuses:', updateError);
                toast.error('Error', 'Failed to update task statuses.');
                // Continue with displaying tasks even if updates fail
            } else {
                // Show a notification about the automatic updates
                toast.success('Success', `Automatically moved ${tasksToUpdate.length} task${tasksToUpdate.length > 1 ? 's' : ''} to ongoing status.`);
            }
        }
        
        // Fetch updated tasks to ensure UI reflects current state
        const { data: updatedTasksData, error: updatedFetchError } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (updatedFetchError) {
            console.error('Error fetching updated tasks:', updatedFetchError);
            toast.error('Error', 'Failed to fetch updated tasks.');
            setTasks(tasksData || []); // Use original data if updated fetch fails
        } else {
            setTasks(updatedTasksData || []);
        }
        
        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    // Keyboard shortcuts
    useKeyboardShortcuts({
        'ctrl+n': () => setIsModalOpen(true),
        'ctrl+1': () => setActiveTab('ongoing'),
        'ctrl+2': () => setActiveTab('completed'),
        'escape': () => setIsModalOpen(false),
    }, [setIsModalOpen, setActiveTab]);

    const handleAddTask = async (task, subTasks) => {
        setIsAddingTask(true);
        const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .insert([{ ...task, user_id: user.id }])
            .select();

        if (taskError) {
            console.error('Error adding task:', taskError);
            toast.error('Error', 'Failed to add task. Please try again.');
            setIsAddingTask(false);
            return;
        }

        if (taskData) {
            const newTaskId = taskData[0].id;
            const subTaskInserts = subTasks.map(title => ({ task_id: newTaskId, title }));

            const { error: subTaskError } = await supabase
                .from('sub_tasks')
                .insert(subTaskInserts);

            if (subTaskError) {
                console.error('Error adding sub-tasks:', subTaskError);
                toast.error('Error', 'Failed to add sub-tasks. Please try again.');
                // Optional: attempt to delete the parent task if sub-tasks fail
                await supabase.from('tasks').delete().eq('id', newTaskId);
                setIsAddingTask(false);
            } else {
                fetchTasks(); // Refetch all tasks to get the new one with its sub-tasks
                setIsModalOpen(false);
                toast.success('Success', 'Task added successfully.');
                setIsAddingTask(false);
            }
        }
    };

    // New handler for quick add task
    const handleQuickAddTask = async (task) => {
        setIsAddingTask(true);
        const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .insert([{ ...task, user_id: user.id }])
            .select();

        if (taskError) {
            console.error('Error adding task:', taskError);
            toast.error('Error', 'Failed to add task. Please try again.');
            setIsAddingTask(false);
            return;
        }

        if (taskData) {
            fetchTasks(); // Refetch all tasks to get the new one
            setIsQuickAddOpen(false);
            toast.success('Success', 'Task added successfully.');
            setIsAddingTask(false);
        }
    };

    const handleUpdateTaskStatus = async (id, status) => {
        setUpdatingTaskIds(prev => new Set(prev).add(id));
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating task:', error);
            toast.error('Error', 'Failed to update task status.');
        } else {
            fetchTasks(); // Refetch tasks to update the UI
            toast.success('Success', 'Task status updated.');
        }
        setUpdatingTaskIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const handleDeleteTask = async (id) => {
        setDeletingTaskIds(prev => new Set(prev).add(id));
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
            toast.error('Error', 'Failed to delete task.');
        } else {
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success('Success', 'Task deleted successfully.');
        }
        setDeletingTaskIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const ongoingTasks = tasks.filter(task => task.status === 'ongoing' || task.status === 'upcoming');
    const completedTasks = tasks.filter(task => task.status === 'completed');
    
    // Apply filters and search to tasks
    const filteredOngoingTasks = applyFiltersAndSearch(ongoingTasks, {
        priorityFilters,
        dueDateFilter,
        statusFilters
    }, searchQuery);
    
    const filteredCompletedTasks = applyFiltersAndSearch(completedTasks, {
        priorityFilters,
        dueDateFilter,
        statusFilters
    }, searchQuery);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {activeTab === 'ongoing' ? 'Ongoing Tasks' : 'Completed Tasks'}
                    </h1>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        activeTab === 'ongoing' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }`}>
                        {activeTab === 'ongoing' ? 'Active' : 'Done'}
                    </span>
                    {/* Active filter indicator */}
                    {hasActiveFilters({ priorityFilters, dueDateFilter, statusFilters }) && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                            Filtered
                        </span>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                            className={`p-2 rounded-lg ${
                                hasActiveFilters({ priorityFilters, dueDateFilter, statusFilters })
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                            aria-label="Filter tasks"
                            title="Filter tasks"
                        >
                            <FunnelIcon className="h-5 w-5" />
                        </button>
                        {isFilterPanelOpen && (
                            <FilterPanel
                                priorityFilters={priorityFilters}
                                setPriorityFilters={setPriorityFilters}
                                dueDateFilter={dueDateFilter}
                                setDueDateFilter={setDueDateFilter}
                                statusFilters={statusFilters}
                                setStatusFilters={setStatusFilters}
                                onClose={() => setIsFilterPanelOpen(false)}
                            />
                        )}
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25"
                        aria-label="Add new task"
                        title="Add new task (Ctrl+N)"
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                        <span className="font-medium">Add Task</span>
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700" role="tablist" aria-label="Task categories">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button 
                        onClick={() => setActiveTab('ongoing')} 
                        className={`${activeTab === 'ongoing' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                        role="tab"
                        aria-selected={activeTab === 'ongoing'}
                        aria-controls="ongoing-panel"
                        id="ongoing-tab"
                        tabIndex={activeTab === 'ongoing' ? 0 : -1}
                    >
                        Ongoing
                        <span className="ml-2 text-xs text-gray-400">Ctrl+1</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('completed')} 
                        className={`${activeTab === 'completed' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                        role="tab"
                        aria-selected={activeTab === 'completed'}
                        aria-controls="completed-panel"
                        id="completed-tab"
                        tabIndex={activeTab === 'completed' ? 0 : -1}
                    >
                        Completed
                        <span className="ml-2 text-xs text-gray-400">Ctrl+2</span>
                    </button>
                </nav>
            </div>

            {/* Search Input */}
            <div className="mt-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks…"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 sm:text-sm"
                    />
                    {searchQuery && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {filteredOngoingTasks.length + filteredCompletedTasks.length} results
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                {activeTab === 'ongoing' && (
                    <div 
                        id="ongoing-panel"
                        role="tabpanel"
                        aria-labelledby="ongoing-tab"
                        tabIndex={0}
                    >
                        {isLoading ? (
                            <div className="space-y-4" aria-label="Loading ongoing tasks">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                                        <SkeletonLoader lines={3} />
                                    </div>
                                ))}
                            </div>
                        ) : filteredOngoingTasks.length > 0 ? (
                            <TaskList 
                                tasks={filteredOngoingTasks} 
                                onUpdateStatus={handleUpdateTaskStatus} 
                                onDelete={handleDeleteTask}
                                updatingTaskIds={updatingTaskIds}
                                deletingTaskIds={deletingTaskIds}
                            />
                        ) : (
                            <EmptyState 
                                type="ongoing" 
                                onAction={() => setIsModalOpen(true)}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'completed' && (
                    <div 
                        id="completed-panel"
                        role="tabpanel"
                        aria-labelledby="completed-tab"
                        tabIndex={0}
                    >
                        {isLoading ? (
                            <div className="space-y-4" aria-label="Loading completed tasks">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                                        <SkeletonLoader lines={3} />
                                    </div>
                                ))}
                            </div>
                        ) : filteredCompletedTasks.length > 0 ? (
                            <TaskList 
                                tasks={filteredCompletedTasks} 
                                onUpdateStatus={handleUpdateTaskStatus} 
                                onDelete={handleDeleteTask}
                                updatingTaskIds={updatingTaskIds}
                                deletingTaskIds={deletingTaskIds}
                            />
                        ) : (
                            <EmptyState type="completed" />
                        )}
                    </div>
                )}
            </div>

            {/* Floating Action Button for Quick Add */}
            <button
                onClick={() => setIsQuickAddOpen(true)}
                className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-110"
                aria-label="Quick add task"
                title="Quick add task"
            >
                <PlusIcon className="h-6 w-6" />
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a new task">
                <AddTask onAddTask={handleAddTask} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            {/* Quick Add Task Modal */}
            {isQuickAddOpen && (
                <QuickAddTask 
                    onSubmit={handleQuickAddTask} 
                    onCancel={() => setIsQuickAddOpen(false)} 
                />
            )}
        </Layout>
    );
}
