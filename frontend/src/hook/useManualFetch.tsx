import React from "react";

type FetchStatus = "idle" | "loading" | "success" | "error";

type FetchResponse<ResponseApi> = {
    data: ResponseApi | null;
    success: boolean;
    error: string | null;
    message: string;
};

function useManualFetch<ResponseApi>(): {
    status: FetchStatus;
    response: FetchResponse<ResponseApi> | null;
    fetchData: (url: string, config?: RequestInit) => Promise<void>;
} {
    const [status, setStatus] = React.useState<FetchStatus>("idle");
    const [response, setResponse] = React.useState<FetchResponse<ResponseApi> | null>(null);

    async function fetchData(url: string, config: RequestInit = {}) {
        setStatus("loading");

        try {
            const res = await fetch(url, config);
            const data = await res.json();            
            
            if (!data?.success) {
                setResponse(data);
                setStatus("error");
                return
            }
            setResponse(data);
            setStatus("success");
        } catch (err) {
            setResponse({
                data: null,
                success: false,
                error: err instanceof Error ? err.message : "Unknown error",
                message: "Failed to fetch",
            });
            setStatus("error");
        }
    }

    return { status, response, fetchData };
}


export default useManualFetch