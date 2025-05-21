import React from "react";
import { PageHeader } from '../components/index.ts';


const Desk: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <PageHeader title='desk' />



                {/* Deck Info */}
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-black dark:text-white">Deck 1</h2>
                    <p className="text-gray-500 dark:text-gray-400">Card 1 of 10</p>
                </div>

                {/* Card */}
                <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 my-4 min-h-[150px] flex items-center justify-center">
                    <p className="text-2xl font-bold text-black dark:text-white">Question</p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <button
                        className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                    >
                        Show Answer
                    </button>
                    <div className="flex space-x-2">
                        <button
                            className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            Again
                        </button>
                        <button
                            className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            Good
                        </button>
                        <button
                            className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                        >
                            Easy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Desk