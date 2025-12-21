import Modal from '../ui/Modal';

export default function TermsOfService({ isOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Terms of Service"
            size="large"
        >
            <div className="max-h-96 overflow-y-auto space-y-6 text-sm">
                <section className="bg-emerald-50 dark:bg-black p-4 rounded-lg border border-emerald-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-400">1. Acceptance of Terms</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                        By accessing or using TaskFlow, you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, you must not use TaskFlow.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-emerald-300">2. Eligibility</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        You must be at least the minimum legal age required in your jurisdiction to use TaskFlow.
                        You are responsible for providing accurate and complete account information when using TaskFlow.
                    </p>
                </section>

                <section className="bg-emerald-50 dark:bg-black p-4 rounded-lg border border-emerald-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-400">3. User Accounts</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                        You are responsible for maintaining the confidentiality of your TaskFlow account credentials.
                        Any activity occurring under your TaskFlow account is your responsibility.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-emerald-300">4. Use of the Service</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow is intended for personal productivity and task management purposes only.
                        You agree not to misuse TaskFlow, attempt unauthorized access, or engage in illegal activities.
                    </p>
                </section>

                <section className="bg-emerald-50 dark:bg-black p-4 rounded-lg border border-emerald-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-400">5. User Content</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                        You retain ownership of all tasks, sub-tasks, and content you create within TaskFlow.
                        TaskFlow processes this content solely to provide its core functionality.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-emerald-300">6. Service Availability</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        While TaskFlow strives to maintain availability, uninterrupted or error-free service is not guaranteed.
                        Data loss or service interruptions may occur due to technical reasons.
                    </p>
                </section>

                <section className="bg-emerald-50 dark:bg-black p-4 rounded-lg border border-emerald-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-400">7. Modifications to the Service</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                        TaskFlow may update features, functionality, or these terms at any time without prior notice.
                        Continued use of TaskFlow constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-emerald-300">8. Termination</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow reserves the right to suspend or terminate accounts that violate these terms.
                        Users may stop using TaskFlow or delete their account at any time.
                    </p>
                </section>

                <section className="bg-emerald-50 dark:bg-black p-4 rounded-lg border border-emerald-200 dark:border-gray-700">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-400">9. Limitation of Liability</h3>
                    <p className="text-gray-700 dark:text-gray-200">
                        TaskFlow is provided on an "as is" basis.
                        TaskFlow is not liable for productivity loss, missed deadlines, or indirect damages arising from the use of TaskFlow.
                    </p>
                </section>

                <section className="bg-gray-50 dark:bg-black p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-emerald-300">10. Governing Law</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        These terms shall be governed by and interpreted in accordance with applicable local laws.
                    </p>
                </section>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                >
                    I Understand
                </button>
            </div>
        </Modal>
    );
}
