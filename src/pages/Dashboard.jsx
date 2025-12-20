import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import TaskList from '../components/tasks/TaskList';
import AddTask from '../components/tasks/AddTask';
import Modal from '../components/ui/Modal';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching tasks:', error);
        } else {
            setTasks(data);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const handleAddTask = async (task) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ ...task, user_id: user.id }])
            .select();

        if (error) {
            console.error('Error adding task:', error);
        } else if (data) {
            setTasks([...tasks, ...data]);
            setIsModalOpen(false);
        }
    };

    const handleUpdateTaskStatus = async (id, status) => {
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating task:', error);
        } else {
            fetchTasks(); // Refetch tasks to update the UI
        }
    };

    const handleDeleteTask = async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
        } else {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Upcoming Tasks</h1>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Add Task</button>
            </div>
            <TaskList tasks={tasks} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a new task">
                <AddTask onAddTask={handleAddTask} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </Layout>
    );
}
