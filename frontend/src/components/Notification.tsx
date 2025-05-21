import React from 'react';

const Notification: React.FC<{ text: string | null }> = ({ text }) => {
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <p className="text-gray-700 dark:text-gray-300">{text}</p>
            </div>
        </>
    )
};

export default Notification;

