import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Style } from "../models/style";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function fetchStyle(): Promise<Style> {
    const response = await fetchData("/api/styles/", { method: "GET" });
    return response.json();
}

export interface StyleInput {
    backgroundColor: String,
    navbarColor: String,
    passwordColor: String,
}


export async function updateStyle(styleId: string, style: StyleInput): Promise<Style> {
    const response = await fetchData("/api/styles/" + styleId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(style),
        });
    return response.json();
}
