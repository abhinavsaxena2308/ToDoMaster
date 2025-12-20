import React from 'react';
import { cn } from '../../utils/cn';

export default function Input({
    className,
    type = 'text',
    label,
    error,
    helperText,
    required = false,
    disabled = false,
    ...props
}) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
                    'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                    'border-gray-300 dark:border-gray-600',
                    'placeholder-gray-500 dark:placeholder-gray-400',
                    error && 'border-red-500 focus:ring-red-500',
                    disabled && 'opacity-50 cursor-not-allowed',
                    className
                )}
                disabled={disabled}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
        </div>
    );
}
