"use server"
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { AddItemInput, ApiResponse, Item, Page, Pagination } from "./types";
import assert from "assert";
import { revalidatePath } from "next/cache";



export async function getAllItems(
    values: Pagination
): Promise<ApiResponse<Page<Item>>> {
    const access_token = cookies().get("access_token")

    assert(access_token && access_token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/management/items?page=${values.pageNumber}&size=${values.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token?.value}`
            },
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        console.log(response);

        const data: ApiResponse<Page<Item>> = await response.json();

        return data;
    } catch (error) {
        console.error("Error loading items:", error);
        throw error;
    }
}
export async function AddItem(values: FormData): Promise<ApiResponse<Item>> {
    console.log(values);

    const access_token = cookies().get("access_token");
    assert(access_token && access_token.value != ""); // it always should exist

    try {

        const response = await fetch(API_URL + "/management/items/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${access_token?.value}`,
            },
            body: values,
        });

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: ApiResponse<Item> = await response.json();
        revalidatePath("/dashboard/items")
        return data;
    } catch (error) {
        console.error("Error during creating item:", error);
        throw error;
    }
}
