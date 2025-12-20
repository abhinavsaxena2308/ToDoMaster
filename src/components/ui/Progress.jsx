import React from 'react';
import { cn } from '../../utils/cn';

export default function Progress({
    value = 0,
    max = 100,
    className,
    showPercentage = true,
    size = 'md',
    color = 'emerald',
    ...props
}) {
    const percentage = Math.round((value / max) * 100);
    
    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2.5',
        lg: 'h-4'
    };
    
    const colorClasses = {
        emerald: 'bg-emerald-600',
        blue: 'bg-blue-600',
        red: 'bg-red-600',
        yellow: 'bg-yellow-600',
        gray: 'bg-gray-600'
    };

    return (
        <div className={cn('w-full', className)} {...props}>
            {showPercentage && (
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{percentage}%</span>
                </div>
            )}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={cn(
                        'rounded-full transition-all duration-500 ease-out',
                        sizeClasses[size],
                        colorClasses[color]
                    )}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                    aria-label={`Progress: ${percentage}%`}
                />
            </div>
        </div>
    );
}
