export default function SubTaskList({ subTasks }) {
    return (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sub-tasks</h4>
            <ul className="space-y-2">
                {subTasks.map((subTask) => (
                    <li key={subTask.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={subTask.isCompleted}
                            readOnly
                            className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500 bg-gray-100 dark:bg-gray-900"
                        />
                        <span className={`ml-3 text-sm ${subTask.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                            {subTask.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}