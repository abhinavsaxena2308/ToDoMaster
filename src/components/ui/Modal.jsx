import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ isOpen, onClose, title, description, children, size = 'lg' }) {
    const sizeClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md', 
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        large: 'sm:max-w-2xl'
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white dark:bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="rounded-md bg-white dark:bg-gray-900 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {description && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {description}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}