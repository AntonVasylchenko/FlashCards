import React from "react";
import { PageHeader } from '../components/index.ts';

const About: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <PageHeader title="about" />


                {/* Author Content */}
                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        Hello! I'm the creator of this FlashCards app. I’m passionate about language learning and enjoy building tools to help others succeed. This app was developed with love and dedication to make learning fun and accessible!
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        If you like my work, feel free to support me. Your encouragement means a lot!
                    </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3 mt-6">
                    <button className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                        Buy Me Coffee
                    </button>
                    <button className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                        Share Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};


export default About