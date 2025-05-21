import React from "react";


const Loader: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                {/* Spinner */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</p>
                    <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch your content.</p>
                </div>
            </div>
        </div>
    );
};

export default Loader