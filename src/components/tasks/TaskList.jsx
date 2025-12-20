import { dummyTasks } from '../../data/dummyTasks';
import TaskCard from './TaskCard';

export default function TaskList() {
    return (
        <div className="space-y-4">
            {dummyTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}