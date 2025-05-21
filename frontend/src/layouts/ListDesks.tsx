import React from "react";
import { Loader, PageHeader, ActionButton, ActionForm } from '../components/index.ts';
import useManualFetch from "../hook/useManualFetch.tsx";
import type { Desk, Card } from "../../types/index.ts"
import { apiEndPoints, getSessionToken } from "../consts/index.ts";
import { NavLink } from "react-router";
import { LocalesContext } from "../main.tsx";


const ListDesks: React.FC = () => {
    const { status, response, fetchData } = useManualFetch<Desk[]>();
    const [desks, setDesks] = React.useState<Desk[]>([]);
    const locales = React.useContext(LocalesContext);

    React.useEffect(() => {
        (async () => {
            const endPoint = apiEndPoints().desk.all();;
            const token = getSessionToken();

            await fetchData(endPoint,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
        })()
    }, []);

    React.useEffect(() => {
        if (response?.data) {
            setDesks(response?.data)
        }
    }, [response])

    const handleRemoveDesk = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset: { id } } = event.target as HTMLButtonElement;
        setDesks(prev => (prev.filter(prevItem => prevItem.id !== id)))
    }, [])

    return (
        <>
            {
                status !== "success" ? <Loader />
                    :
                    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm relative">
                            <PageHeader title='view' />
                            <div className="flex flex-col gap-y-6 overflow-x-hidden overflow-y-auto max-h-100">
                                {
                                    desks.length
                                        ? desks.map(desk => <DestItem key={desk.id} desk={desk} onRemove={handleRemoveDesk} t={locales.t} />)
                                        : <>
                                            <p className="text-lg text-center font-semibold text-black dark:text-white mb-4">
                                                {locales.t("list_desk_empty")}
                                            </p>
                                            <NavLink to="/create" className="w-full text-center block bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                                                {locales.t("list_desk_create")}
                                            </NavLink>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default ListDesks


type DestItemProps = {
    desk: Desk,
    t: (key: string) => string,
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const DestItem: React.FC<DestItemProps> = ({ desk, onRemove, t }) => {
    const { id, title, description } = desk;

    const [openForms, setOpenForms] = React.useState<Record<'edit' | 'add', boolean>>({ edit: false, add: false });

    const { fetchData } = useManualFetch<Desk[]>();
    const { status: statusEdit, response: responseEdit, fetchData: fetchDataEdit } = useManualFetch<Desk>();
    const { status: statusAdd, response: responseAdd, fetchData: fetchDataAdd } = useManualFetch<Card>();



    const handleRemove = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        const endPoint = apiEndPoints().desk.delete(id);
        const token = getSessionToken();
        onRemove(event)

        await fetchData(endPoint,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }
        )
    }, [])

    const handleOpenForm = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = event.target as HTMLButtonElement
        const anotherKey = name === "edit" ? "add" : "edit"
        if (name === "edit" || name === "add") {
            setOpenForms((prev) => ({ ...prev, [name]: !prev[name], [anotherKey]: false }))
        }
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const formType = formData.get("type");
        formData.delete("type")
        const formMethod = form.dataset.method as "POST" | "PATCH" | "DELETE" | "GET";
        const formPayload = Object.fromEntries(formData)

        const typeFetch = {
            edit: fetchDataEdit,
            add: fetchDataAdd
        }

        const typeEndPoint = {
            edit: apiEndPoints().desk.update(id),
            add: apiEndPoints().card.create()
        }

        if (formType === "edit" || formType === "add") {
            const token = getSessionToken();
            try {
                await typeFetch[formType](typeEndPoint[formType], {
                    method: formMethod,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formPayload),
                })
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        }
    }

    const actions = [
        { id: "list-edit", onClick: handleOpenForm, name: "edit", classList: "blue", label: t("list_desk_edit") },
        { id: "list-remove", onClick: handleRemove, name: "remove", classList: "red", label: t("list_desk_remove"), extra: { "data-id": id } },
        { id: "list-add", onClick: handleOpenForm, name: "add", classList: "green", label: t("list_desk_add_word") },
    ];

    const editFormFields = [
        {
            id: "title",
            tag: "input",
            name: "title",
            type: "text",
            label: t("list_desk_form_title"),
            placeholder: t("list_desk_form_title"),
            value: title,
        },
        {
            id: "description",
            tag: "textarea",
            name: "description",
            type: "text",
            label: t("list_desk_form_description"),
            placeholder: t("list_desk_form_description"),
            value: description || "",
        },
    ];

    const saveFormFields = [
        {
            id: "deskId",
            tag: "input",
            name: "deskId",
            type: "hidden",
            label: "",
            value: id,
        },
        {
            id: "question",
            tag: "input",
            name: "question",
            type: "text",
            label: t("list_desk_form_question"),
            value: "",
        },
        {
            id: "answer",
            tag: "textarea",
            name: "answer",
            type: "text",
            label: t("list_desk_form_answer"),
            value: "",
        },
        {
            id: "hint",
            tag: "textarea",
            name: "hint",
            type: "text",
            label: t("list_desk_form_hint"),
            value: "",
        },
    ];

    return (
        <div className="border-b border-gray-200 dark:border-gray-600 py-3 px-2 rounded-lg">
            <NavLink
                to={`/list/${id}`}
                className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
            >
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
                </div>
                <span className="text-2xl text-gray-500 dark:text-gray-400">›</span>
            </NavLink>

            <div className="flex items-center justify-end space-x-2">
                {actions.map(action => {
                    return (
                        <ActionButton
                            key={action.id}
                            onClick={action.onClick}
                            name={action.name}
                            classList={action.classList as "blue" | "red" | "green"}
                            {...action.extra}
                        >
                            {action.label}
                        </ActionButton>
                    )
                })}
            </div>

            {openForms.edit &&
                <ActionForm
                    type="edit"
                    method="PATCH"
                    notification={responseEdit?.message}
                    onSubmit={handleSubmit}
                    fields={editFormFields}
                    buttonLabel={statusEdit === "loading"
                        ? t("list_desk_form_submit")
                        : t("list_desk_form_submit")}
                />
            }
            {openForms.add &&
                <ActionForm
                    type="add"
                    method="POST"
                    notification={responseAdd?.message}
                    onSubmit={handleSubmit}
                    fields={saveFormFields}
                    buttonLabel={statusAdd === "loading"
                        ? t("list_desk_form_submit")
                        : t("list_desk_form_submit")}
                />
            }
        </div>
    );
}