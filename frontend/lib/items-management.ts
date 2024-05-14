"use server"
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { AddItemInput, ErrorResponse, Item, Page, Pagination, Reclamation } from "./types";
import assert from "assert";
import { revalidatePath } from "next/cache";



export async function getAllItems(
    values: Pagination
): Promise<Page<Item>> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/items?page=${values.pageNumber}&size=${values.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: Page<Item> = await response.json();

        return data;
    } catch (error) {
        console.error("Error loading items:", error);
        throw error;
    }
}



export async function getAllReclamations(
    values: Pagination
): Promise<Page<Reclamation>> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/reclamations?page=${values.pageNumber}&size=${values.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: Page<Reclamation> = await response.json();

        return data;
    } catch (error) {
        console.error("Error loading items:", error);
        throw error;
    }
}
export async function AddItem(values: FormData): Promise<Item | ErrorResponse> {
    const token = cookies().get("token");
    assert(token && token.value != "");
    try {
        const response = await fetch(API_URL + "/items/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token?.value}`,
            },
            body: values,
        });

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }


        const data: Item = await response.json();
        revalidatePath("/dashboard/items")
        return data;
    } catch (error) {
        console.error("Error during creating item:", error);
        throw error;
    }
}


export async function ClaimItem(values: FormData): Promise<{ message: string } | ErrorResponse> {
    const token = cookies().get("token");
    assert(token && token.value != "");
    try {
        const response = await fetch(API_URL + "/reclamations/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token?.value}`,
            },
            body: values,
        });

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }


        const data: string = await response.text();
        revalidatePath("/dashboard/items")
        return {
            message: data
        };
    } catch (error) {
        console.error("Error during claiming item:", error);
        throw error;
    }
}


export async function getReclamation(reclamationId: number): Promise<Reclamation> {
    const token = cookies().get("token");
    assert(token && token.value != "");
    try {
        const response = await fetch(API_URL + "/reclamations/" + reclamationId, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token?.value}`,
            },
        });

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            throw new Error(errorRespose.message);
        }


        const data: Reclamation = await response.json();
        return data;
    } catch (error) {
        console.error("Error during claiming item:", error);
        throw error;
    }
}

export async function rejectReclamtion(
    reclamationId: number
): Promise<Reclamation | ErrorResponse> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/reclamations/${reclamationId}/reject`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                'accept': "*/*",
                "Authorization": `Bearer ${token.value}`
            },
        });
        console.log(response);

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }

        const data: Reclamation = await response.json();
        revalidatePath("/dashboard/recmlamationS/");
        return data;
    } catch (error) {
        console.error("Error UPDATE RECLAMATION:", error);
        throw error;
    }
}

export async function acceptReclamtion(
    reclamationId: number
): Promise<Reclamation | ErrorResponse> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/reclamations/${reclamationId}/accept`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                'accept': "*/*",
                "Authorization": `Bearer ${token.value}`
            },
        });
        console.log(response);

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }

        const data: Reclamation = await response.json();
        revalidatePath("/dashboard/recmlamationS/");
        return data;
    } catch (error) {
        console.error("Error UPDATE RECLAMATION:", error);
        throw error;
    }
}
