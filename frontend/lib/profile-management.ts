"use server"
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { AddItemInput, ApiResponse, EditProfileInput, Item, Page, Pagination, User } from "./types";
import assert from "assert";
import { revalidatePath } from "next/cache";



export async function updateProfileInfo(
    values: EditProfileInput
): Promise<ApiResponse<User>> {
    const access_token = cookies().get("access_token")

    assert(access_token && access_token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/profile/update-info`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token?.value}`
            },
            body: JSON.stringify(values),
        });
        console.log(response);

        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: ApiResponse<User> = await response.json();
        cookies().set("current_user", JSON.stringify(data.data));
        revalidatePath("/dashboard/profile/");
        return data;
    } catch (error) {
        console.error("Error editing profile:", error);
        throw error;
    }
}
