import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    secondary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

const badgeSizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
};

export default function Badge({
    children,
    className,
    variant = 'default',
    size = 'md',
    ...props
}) {
    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full',
                badgeVariants[variant],
                badgeSizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
