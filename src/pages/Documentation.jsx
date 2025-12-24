import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSharedTheme } from '../contexts/SharedThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpenIcon, 
  LightBulbIcon, 
  CodeBracketIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ArrowsRightLeftIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function Documentation() {
  const { isDarkMode } = useSharedTheme();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: BookOpenIcon },
    { id: 'getting-started', title: 'Getting Started', icon: LightBulbIcon },
    { id: 'features', title: 'Features', icon: CheckCircleIcon },
    { id: 'tasks', title: 'Task Management', icon: ClipboardDocumentListIcon },
    { id: 'subtasks', title: 'Subtasks', icon: ArrowsRightLeftIcon },
    { id: 'filters', title: 'Filters & Sorting', icon: ArrowRightIcon },
    { id: 'authentication', title: 'Authentication', icon: UserCircleIcon },
    { id: 'api', title: 'API Reference', icon: CodeBracketIcon },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: BellAlertIcon },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">TaskFlow Documentation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Welcome to TaskFlow, a comprehensive task management application designed to help you organize, track, and complete your tasks efficiently.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What is TaskFlow?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                TaskFlow is a modern task management application built with React 19 and Vite, using Supabase for authentication and database management. 
                It provides a clean, intuitive interface for managing tasks, subtasks, and tracking progress.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Key Benefits</h4>
                  <ul className="text-emerald-700 dark:text-emerald-300 space-y-1">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Intuitive task organization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Progress tracking and visualization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced filtering and sorting</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Technical Stack</h4>
                  <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                    <li className="flex items-start">
                      <CodeBracketIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>React 19 + Vite 7</span>
                    </li>
                    <li className="flex items-start">
                      <CodeBracketIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Supabase (Authentication & Database)</span>
                    </li>
                    <li className="flex items-start">
                      <CodeBracketIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tailwind CSS for styling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'getting-started':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Creating an Account</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-300">
                <li>Click the "Sign Up" button in the navigation bar</li>
                <li>Enter your full name, email address, and create a password</li>
                <li>Check your email for a confirmation link</li>
                <li>Click the confirmation link to activate your account</li>
                <li>Sign in with your credentials to access the dashboard</li>
              </ol>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">First Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Create your first task</h4>
                    <p className="text-gray-600 dark:text-gray-400">Click the "Add Task" button to create your first task with title, description, due date, and priority.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Add subtasks</h4>
                    <p className="text-gray-600 dark:text-gray-400">Break down complex tasks into manageable subtasks using the subtask functionality.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Use filters</h4>
                    <p className="text-gray-600 dark:text-gray-400">Filter tasks by priority, status, or due date to focus on what's important.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Features Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Task Management</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Create tasks with title, description, and due dates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Set priority levels (Low, Medium, High)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Track progress with visual indicators</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Mark tasks as completed</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Subtask Management</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Break tasks into smaller, manageable subtasks</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Track completion of individual subtasks</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Visual progress based on subtask completion</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Add subtasks dynamically to existing tasks</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Advanced Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Filter tasks by multiple criteria</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Sort tasks by due date, priority, or progress</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Search functionality across all tasks</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Auto-move tasks based on due dates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Experience</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Dark/Light mode support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Responsive design for all devices</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Modal-based task viewing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span>Keyboard shortcuts support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'tasks':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Task Management</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Creating Tasks</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To create a new task, click the "Add Task" button or use the keyboard shortcut Ctrl+N.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Fields</h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Title:</strong> A descriptive name for the task</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Priority:</strong> Low, Medium, or High importance</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Optional Fields</h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Description:</strong> Detailed information about the task</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Due Date:</strong> When the task should be completed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Task Statuses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Upcoming</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Tasks that are planned but not yet started. These will automatically move to Ongoing when their due date arrives.
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Ongoing</h4>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Tasks that are currently in progress. These can be marked as completed when finished.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Completed</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Tasks that have been finished. Completed tasks are tracked separately for progress analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'subtasks':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Subtask Management</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Working with Subtasks</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Subtasks allow you to break down complex tasks into smaller, manageable pieces. 
                Each task can have multiple subtasks that can be completed individually.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Adding Subtasks</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    To add subtasks to a task, click on the task card to open the modal view. 
                    You'll find the subtask form at the top of the subtask list.
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Enter the subtask title in the input field</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Click "Add" to create the subtask</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>The subtask will appear in the list and can be marked as complete</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Managing Subtasks</h4>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Complete:</strong> Check the checkbox to mark a subtask as complete</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Delete:</strong> Click the trash icon to remove a subtask</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRightIcon className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Progress:</strong> Task progress updates automatically based on subtask completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Task progress is calculated based on the percentage of completed subtasks.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">40%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  2 of 5 subtasks completed
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Documentation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This section is under construction. Please check back later for more detailed documentation.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black/50 backdrop-blur-lg border-white/10' : 'bg-white/50 backdrop-blur-lg border-gray-200/20'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="h-5 w-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TaskFlow Docs</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => {}} // Theme toggle is handled by context
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
              >
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
              
              {/* Navigation Links */}
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Documentation</h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}