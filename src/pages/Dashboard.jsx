import Layout from '../components/layout/Layout';
import TaskList from '../components/tasks/TaskList';

export default function Dashboard() {
    return (
        <Layout>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Upcoming Tasks</h1>
            <TaskList />
        </Layout>
    );
}
