import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function SubTaskList({ taskId, taskStatus, onProgressUpdate, onTaskStatusUpdate }) {
    const [subTasks, setSubTasks] = useState([]);
    const [newSubTaskTitle, setNewSubTaskTitle] = useState('');

    const fetchSubTasks = async () => {
        const { data, error } = await supabase
            .from('sub_tasks')
            .select('*')
            .eq('task_id', taskId);
        if (error) console.error('Error fetching sub-tasks:', error);
        else setSubTasks(data);
    };

    useEffect(() => {
        if (onProgressUpdate) {
            const completed = subTasks.filter(st => st.is_completed).length;
            const total = subTasks.length;
            onProgressUpdate(completed, total);
        }
    }, [subTasks, onProgressUpdate]);

    useEffect(() => {
        fetchSubTasks();
    }, [taskId]);

    const handleAddSubTask = async (e) => {
        e.preventDefault();
        if (!newSubTaskTitle.trim()) return;

        const { data, error } = await supabase
            .from('sub_tasks')
            .insert([{ task_id: taskId, title: newSubTaskTitle }])
            .select();

        if (error) console.error('Error adding sub-task:', error);
        else if (data) {
            setSubTasks([...subTasks, ...data]);
            setNewSubTaskTitle('');
            
            // If task was completed and we're adding a new subtask, change status to ongoing
            if (taskStatus === 'completed' && onTaskStatusUpdate) {
                onTaskStatusUpdate(taskId, 'ongoing');
            }
        }
    };

    const handleToggleComplete = async (id, isCompleted) => {
        const { error } = await supabase
            .from('sub_tasks')
            .update({ is_completed: !isCompleted })
            .eq('id', id);

        if (error) console.error('Error updating sub-task:', error);
        else fetchSubTasks();
    };

    const handleDeleteSubTask = async (id) => {
        const { error } = await supabase
            .from('sub_tasks')
            .delete()
            .eq('id', id);

        if (error) console.error('Error deleting sub-task:', error);
        else setSubTasks(subTasks.filter((st) => st.id !== id));
    };

    return (
        <>
            <form onSubmit={handleAddSubTask} className="mb-3 flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={newSubTaskTitle}
                    onChange={(e) => setNewSubTaskTitle(e.target.value)}
                    placeholder="Add a new sub-task..."
                    className="flex-grow text-sm rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                />
                <button 
                    type="submit" 
                    className="px-3 py-1 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Add
                </button>
            </form>
            <ul className="space-y-2">
                {subTasks.map((subTask) => (
                    <li key={subTask.id} className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                        <div className="flex items-center min-w-0">
                            <input
                                type="checkbox"
                                checked={subTask.is_completed}
                                onChange={() => handleToggleComplete(subTask.id, subTask.is_completed)}
                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-900 transition-colors duration-200 flex-shrink-0"
                            />
                            <span className={`ml-3 text-sm ${subTask.is_completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'} min-w-0 truncate`}>
                                {subTask.title}
                            </span>
                        </div>
                        <button 
                            onClick={() => handleDeleteSubTask(subTask.id)} 
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                        >
                            <TrashIcon className="h-4 w-4 text-red-500" />
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}