import React from "react";
import { PageHeader } from '../components/index.ts';

const NotFound: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <PageHeader title='404' />

                {/* Content */}
                <div className="space-y-4">
                    <p className="text-4xl font-bold text-gray-700 dark:text-gray-300">Oops!</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        It looks like the page you're looking for doesn't exist. Let's get you back on track!
                    </p>
                </div>

                {/* Button */}
                <div className="space-y-3 mt-6">
                    <button className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                        Go to Main Page
                    </button>
                </div>
            </div>
        </div>
    );
};


export default NotFound