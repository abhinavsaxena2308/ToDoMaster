import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useSharedTheme } from '../contexts/SharedThemeContext';
import logo from '../../public/logo.png';

export default function LandingPage() {
    const { isDarkMode, toggleTheme } = useSharedTheme();

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black/50 backdrop-blur-lg border-white/10' : 'bg-white/50 backdrop-blur-lg border-gray-200/20'} border-b`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <img src={logo} className="h-8 w-21 object-contain" alt="Task Flow Logo"/>
                                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Task Flow</span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Home</a>
                            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Features</a>
                            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About</a>
                            <a href="#" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Docs</a>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/login" 
                                className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/signup" 
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Sign Up
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
                            >
                                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    {/* Abstract Shapes */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl"></div>
                    
                    {/* Grid Pattern */}
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]' : 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2310b981" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'}`}></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <div className="text-center">
                        {/* Headline */}
                        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                            <span className="block">Organize Tasks.</span>
                            <span className="block">Track Progress.</span>
                            <span className="block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">Stay Focused.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto leading-relaxed`}>
                            Streamline your workflow with powerful task management, sub-task organization, and real-time progress tracking. 
                            Built for teams and individuals who value productivity and clarity.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/dashboard" 
                                className="px-8 py-4 text-lg font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2"
                            >
                                <span>Get Started</span>
                                <ArrowRightIcon className="h-5 w-5" />
                            </Link>
                            <button className={`px-8 py-4 text-lg font-medium ${isDarkMode ? 'text-white border-white/20 hover:bg-white/10' : 'text-gray-900 border-gray-300 hover:bg-gray-50'} border rounded-xl transition-all duration-200 flex items-center space-x-2`}>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span>View on GitHub</span>
                            </button>
                        </div>

                        {/* Feature Highlights */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <img src={logo} className="h-10 w-10 object-contain" alt="Task Flow Logo"/>
                                </div>
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Smart Tasks</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Create, organize, and prioritize tasks with intelligent categorization</p>
                            </div>
                            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <ArrowRightIcon className="h-6 w-6 text-emerald-500" />
                                </div>
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Sub-tasks</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Break down complex projects into manageable sub-tasks</p>
                            </div>
                            <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <div className="h-6 w-6 bg-emerald-500 rounded-full"></div>
                                </div>
                                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Progress Tracking</h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Visual progress indicators keep you motivated and on track</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
