import React from "react";
import Notification from "./Notification"
type FormField = {
    tag: string
    name: string
    type: string
    placeholder?: string
    label: string
    value: string
    id: string
}

type ActionFormType = {
    type: string
    method: "POST" | "PATCH" | "DELETE" | "GET"
    fields: FormField[]
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    buttonLabel: string,
    notification: string | undefined
}


const ActionForm: React.FC<ActionFormType> = ({ type, onSubmit, fields, buttonLabel, method, notification }) => {
    return (
        <form onSubmit={onSubmit} data-method={method} className="my-4 space-y-4">
            <input type="hidden" name="type" value={type} />
            {fields.map(({ tag, label, type, name, placeholder, value, id, ...rest }) => {
                if (type === "hidden") {
                    return (
                        <input
                            key={id}
                            type="hidden"
                            name={name}
                            value={value}
                        />
                    );
                }

                const commonProps = {
                    id,
                    name,
                    placeholder,
                    defaultValue: value,
                    className:
                        "w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg " +
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 " +
                        "bg-white dark:bg-gray-700 text-black dark:text-white " +
                        "placeholder-gray-500 dark:placeholder-gray-400"
                };

                return (
                    <div key={id} className="mb-4">
                        <label htmlFor={id} className="block text-sm font-medium text-black dark:text-white mb-1">
                            {label}
                        </label>

                        {tag === "input" ? (
                            <input
                                type={type}
                                {...commonProps}
                                {...rest}
                            />
                        ) : (
                            <textarea
                                {...commonProps}
                                {...rest}
                                className={`${commonProps.className} resize-none h-20`}
                            />
                        )}
                    </div>
                );
            })}

            {notification && <Notification text={notification} />}

            <button
                type="submit"
                className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
            >
                {buttonLabel}
            </button>


        </form>
    )
}

export default ActionForm