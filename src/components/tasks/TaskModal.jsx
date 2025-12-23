import Modal from '../ui/Modal';
import SubTaskList from './SubTaskList';
import { formatDate } from '../../utils/taskUtils';

const statusStyles = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

// Priority styles for visual indicators
const priorityStyles = {
    Low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export default function TaskModal({ isOpen, onClose, task, onUpdateStatus, onDelete, onTaskStatusUpdate }) {
    if (!task) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={task.title}
            size="2xl"
        >
            <div className="space-y-6">
                {/* Task details header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${priorityStyles[task.priority]}`}>
                            {task.priority}
                        </span>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[task.status]}`}>
                            {task.status}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Due: {formatDate(task.dueDate || task.due_date)}
                    </div>
                </div>

                {/* Task description */}
                <div className="text-gray-700 dark:text-gray-300">
                    <p className="whitespace-pre-wrap">{task.description}</p>
                </div>

                {/* Subtask section */}
                <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sub-tasks</h4>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <SubTaskList 
                            taskId={task.id} 
                            taskStatus={task.status}
                            onProgressUpdate={() => {}} // Progress is handled by parent
                            onTaskStatusUpdate={onTaskStatusUpdate}
                        />
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02]"
                >
                    Delete Task
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}