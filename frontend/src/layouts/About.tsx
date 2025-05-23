import React from "react";
import { PageHeader } from '../components/index.ts';
import { LocalesContext } from "../main.tsx";

const About: React.FC = () => {
    const { t } = React.useContext(LocalesContext);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <PageHeader title="about" />


                <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        {t("about_text")}
                    </p>
                </div>

                <div className="space-y-3 mt-6">
                    <a className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition" href="https://t.me/FlashCardsApplication" target="_blank" rel="noopener noreferrer">
                        {t("about_button")}
                    </a>
                </div>
            </div>
        </div>
    );
};


export default About