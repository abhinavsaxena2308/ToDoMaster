import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function AddTask({ onAddTask, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium'); // New state for priority
    const [subTasks, setSubTasks] = useState(['']);

    const handleSubTaskChange = (index, value) => {
        const newSubTasks = [...subTasks];
        newSubTasks[index] = value;
        setSubTasks(newSubTasks);
    };

    const handleAddSubTask = () => {
        setSubTasks([...subTasks, '']);
    };

    const handleRemoveSubTask = (index) => {
        const newSubTasks = subTasks.filter((_, i) => i !== index);
        setSubTasks(newSubTasks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredSubTasks = subTasks.filter(st => st.trim() !== '');
        if (filteredSubTasks.length === 0) {
            // Here you could show an error message to the user
            alert('Please add at least one sub-task.');
            return;
        }
        onAddTask({ title, description, due_date: dueDate, status: 'ongoing', priority }, filteredSubTasks);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Task Name</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Completion Date</label>
                    <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                    <select 
                        id="priority" 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-tasks</label>
                <div className="space-y-2 mt-1">
                    {subTasks.map((subTask, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input type="text" value={subTask} onChange={(e) => handleSubTaskChange(index, e.target.value)} className="flex-grow block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder={`Sub-task ${index + 1}`} />
                            <button type="button" onClick={() => handleRemoveSubTask(index)} className="p-1 text-red-500 hover:text-red-700">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={handleAddSubTask} className="mt-2 flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800">
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add Sub-task
                </button>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Add Task</button>
            </div>
        </form>
    );
}