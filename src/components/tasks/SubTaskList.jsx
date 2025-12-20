import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrashIcon } from '@heroicons/react/24/solid';

export default function SubTaskList({ taskId }) {
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
        <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sub-tasks</h4>
            <ul className="space-y-2">
                {subTasks.map((subTask) => (
                    <li key={subTask.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={subTask.is_completed}
                                onChange={() => handleToggleComplete(subTask.id, subTask.is_completed)}
                                className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-900"
                            />
                            <span className={`ml-3 text-sm ${subTask.is_completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                {subTask.title}
                            </span>
                        </div>
                        <button onClick={() => handleDeleteSubTask(subTask.id)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                            <TrashIcon className="h-4 w-4 text-red-500" />
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddSubTask} className="mt-3 flex items-center">
                <input
                    type="text"
                    value={newSubTaskTitle}
                    onChange={(e) => setNewSubTaskTitle(e.target.value)}
                    placeholder="Add a new sub-task..."
                    className="flex-grow text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button type="submit" className="ml-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Add</button>
            </form>
        </div>
    );
}