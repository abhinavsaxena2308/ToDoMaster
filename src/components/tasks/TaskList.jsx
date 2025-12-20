import TaskCard from './TaskCard';

export default function TaskList({ tasks, onUpdateStatus, onDelete, updatingTaskIds, deletingTaskIds }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={onUpdateStatus} 
                    onDelete={onDelete}
                    isUpdating={updatingTaskIds?.has(task.id)}
                    isDeleting={deletingTaskIds?.has(task.id)}
                />
            ))}
        </div>
    );
}