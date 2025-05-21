import React from 'react';
import { Notification, PageHeader } from '../components/index.ts';
import { apiEndPoints, getSessionToken } from '../consts/index.ts';
import useManualFetch from '../hook/useManualFetch.tsx';
import type { Desk } from "../../types/index.ts"
import { LocalesContext } from '../main.tsx';
import useStore from '../store/index.ts';
import { NavLink } from 'react-router';


const CreateDeck: React.FC = () => {
    const locales = React.useContext(LocalesContext);
    const formRef = React.useRef<HTMLFormElement | null>(null);

    const { status, response, fetchData } = useManualFetch<Desk>();
    const { notification } = useStore();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const endPoint = apiEndPoints().desk.create();
        const formData = new FormData(event.target as HTMLFormElement);
        const payload = Object.fromEntries(formData);
        const token = getSessionToken();
        await fetchData(endPoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            }
        )
    }

    React.useEffect(() => {
        if (response?.success && formRef.current) {
            formRef.current.reset();
            (formRef.current?.elements.namedItem("title") as HTMLInputElement)?.focus();
            notification.handle(locales.t("create_desk_success"));
        } else if (response?.success === false) {
            notification.handle(locales.t("create_desk_error"));
        }
        return () => {
            notification.handle("");
        };
    }, [response, formRef])

    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm">
                <PageHeader title='create' />
                {notification.value && <Notification text={notification.value} />}
                {response?.success === true &&
                    <NavLink to='/list' className="w-full block mt-2 mb-5 text-center bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                        {locales.t("create_desk_view")}
                    </NavLink>
                }
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name='title'
                        type="text"
                        disabled={status === "loading"}
                        placeholder={locales.t("create_desk_name")}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <textarea
                        name='description'
                        disabled={status === "loading"}
                        placeholder={locales.t("create_desk_describe")}
                        className="resize-none w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button disabled={status === "loading"} type='submit' className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                        {status === "loading" ? locales.t("create_desk_creating") : locales.t("create_desk_create")}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDeck;
