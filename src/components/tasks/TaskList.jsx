import TaskCard from './TaskCard';

export default function TaskList({ tasks, onUpdateStatus, onDelete }) {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />
            ))}
        </div>
    );
}