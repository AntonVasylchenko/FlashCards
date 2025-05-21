import React from 'react';
import { PageHeader } from '../components';
import useTelegram from '../hook/useTelegram';
import useStore from '../store/index.ts';
import { LocalesContext } from '../main.tsx';



const Settings: React.FC = () => {
    const { storage } = useTelegram();
    const { language, theme } = useStore();
    const locales = React.useContext(LocalesContext);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const target = event.target as HTMLButtonElement;
        const { name: preferenceType, dataset: { value: selectedValue } } = target;

        if ((preferenceType !== "theme" && preferenceType !== "lang") || typeof selectedValue !== "string") return;

        const getPreferenceAction = (preferenceType: "lang" | "theme", newValue: string): () => void => {
            const actions = {
                lang: () => {
                    storage?.setItem("lang", newValue, (error, savedValue) => {
                        if (error) {
                            console.error("Failed to set language:", error);
                            return;
                        }
                        if (savedValue) {
                            language.handle(newValue);
                            locales?.changeLanguage(newValue);
                        }
                    });
                },
                theme: () => {
                    storage?.setItem("theme", newValue, (error, savedValue) => {
                        if (error) {
                            console.error("Failed to set theme:", error);
                            return;
                        }
                        if (savedValue && (newValue === "light" || newValue === "dark")) {
                            theme.handle(newValue)
                        }
                    });
                }
            };

            return actions[preferenceType];
        };

        const action = getPreferenceAction(preferenceType, selectedValue);
        action();
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm">
                <PageHeader title='settings' />

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-black dark:text-white">{locales.t("settings_lang_label")}</h2>
                    <div className="flex space-x-2">
                        <SettingButton label={locales.t("settings_lang_en")} value='en' name="lang" is_active={locales.language_code === "en"} onClick={handleButtonClick} />
                        <SettingButton label={locales.t("settings_lang_uk")} value='uk' name="lang" is_active={locales.language_code === "uk"} onClick={handleButtonClick} />
                    </div>
                </div>

                <div className="space-y-4 mt-6">
                    <h2 className="text-lg font-semibold text-black dark:text-white">{locales.t("settings_theme_label")}</h2>
                    <div className="flex space-x-2">
                        <SettingButton label={locales.t("settings_theme_light")} value='light' name="theme" is_active={theme.value === "light"} onClick={handleButtonClick} />
                        <SettingButton label={locales.t("settings_theme_dark")} value='dark' name="theme" is_active={theme.value === "dark"} onClick={handleButtonClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

type SettingButtonProps = {
    label: string,
    is_active: boolean,
    name: "lang" | "theme",
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value: string
}

const SettingButton: React.FC<SettingButtonProps> = ({ label, is_active, name, onClick, value }) => {
    return (
        <button
            name={name}
            data-value={value}
            onClick={onClick}
            className={`flex-1 font-semibold py-2 rounded-lg transition ${is_active
                ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
        >
            {label}
        </button>
    );
}