import React from "react";
import { NavLink } from "react-router";
import { Logo } from "../components/index.ts";
import { LocalesContext } from "../main.tsx";


const HomePage: React.FC = () => {
    const locales = React.useContext(LocalesContext);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <Logo />

                <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">FlashCards</h1>

                <p className="text-gray-500 dark:text-gray-400 mb-6">{locales.t("home_description")}</p>

                <div className="space-y-3">
                    <ItemLink title={locales.t("create")} path="/create" primary={true} />
                    <ItemLink title={locales.t("view")} path="/list" primary={false} />
                    <ItemLink title={locales.t("about")} path="/about" primary={false} />
                    <ItemLink title={locales.t("settings")} path="/settings" primary={false} />
                </div>
            </div>
        </div>
    );
};


export default HomePage



type ItemLinkType = {
    title: string,
    path: string
    primary: boolean
}

const ItemLink: React.FC<ItemLinkType> = ({ title, path, primary }) => {
    const linkTypes = {
        primary: "w-full block bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition",
        secondary: "w-full block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
    }

    return (
        <NavLink to={path}
            className={primary ? linkTypes.primary : linkTypes.secondary}
        >
            {title}
        </NavLink >
    )

}