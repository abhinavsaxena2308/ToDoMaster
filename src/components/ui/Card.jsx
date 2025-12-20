import React from 'react';
import { cn } from '../../utils/cn';

export default function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
