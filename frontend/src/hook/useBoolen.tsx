import React from "react";

type UseBooleanType = {
    status: boolean,
    toggleStatus: () => void
}

const useBoolean = (initialValue: boolean = false): UseBooleanType => {
    const [status, setStatus] = React.useState<boolean>(initialValue);

    const toggleStatus = () => {
        setStatus(prevStatus => !prevStatus);
    }

    return {
        status,
        toggleStatus
    };
}

export default useBoolean;
