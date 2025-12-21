import Modal from '../ui/Modal';

export default function PrivacyPolicy({ isOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Privacy Policy"
            size="large"
        >
            <div className="max-h-96 overflow-y-auto space-y-4 text-sm">

                <section>
                    <h3 className="font-semibold text-lg mb-2">1. Introduction</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow respects your privacy and is committed to protecting your personal data.
                        This Privacy Policy explains how TaskFlow collects, uses, and safeguards your information.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">2. Information We Collect</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow may collect personal information such as your name, email address, and authentication details.
                        Additionally, TaskFlow stores tasks, sub-tasks, statuses, and related productivity data you create.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">3. How We Use Your Information</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow uses your information to provide core task management functionality,
                        authenticate users, sync data across devices, and improve overall user experience.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">4. Data Storage and Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow stores your data securely using third-party infrastructure providers.
                        Reasonable security measures are implemented to protect against unauthorized access or data loss.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">5. Third-Party Services</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow uses third-party services such as Supabase for authentication and database management.
                        These services may process data according to their own privacy policies.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">6. Cookies and Tracking</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow may use essential cookies or local storage to maintain sessions and preferences.
                        TaskFlow does not use invasive tracking or sell user data.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">7. Data Retention</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow retains your data only for as long as your account remains active.
                        You may delete your account and associated data at any time.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">8. Your Rights</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        You have the right to access, update, or delete your personal data stored in TaskFlow.
                        You may also request clarification regarding how your data is handled.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">9. Changes to This Policy</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        TaskFlow may update this Privacy Policy from time to time.
                        Continued use of TaskFlow indicates acceptance of the revised policy.
                    </p>
                </section>

                <section>
                    <h3 className="font-semibold text-lg mb-2">10. Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        If you have questions or concerns about this Privacy Policy or your data,
                        please contact the TaskFlow support team.
                    </p>
                </section>

            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    I Understand
                </button>
            </div>
        </Modal>
    );
}
