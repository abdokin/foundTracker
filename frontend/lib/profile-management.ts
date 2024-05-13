"use server"
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { EditProfileInput, ErrorResponse, ResetPasswordInput, User } from "./types";
import assert from "assert";
import { revalidatePath } from "next/cache";



export async function updateProfileInfo(
    values: EditProfileInput
): Promise<User | ErrorResponse> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/profile/update-info`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
            body: JSON.stringify(values),
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }

        const data: User = await response.json();
        cookies().set("current_user", JSON.stringify(data));
        revalidatePath("/dashboard/profile/");
        return data;
    } catch (error) {
        console.error("Error editing profile:", error);
        throw error;
    }
}


export async function resetPassword(
    values: ResetPasswordInput
): Promise<{ message: string } | ErrorResponse> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/profile/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
            body: JSON.stringify(values),
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }
        if (!response.ok) {
            const errorRespose: ErrorResponse = await response.json();
            return errorRespose;
        }

        const data: string = await response.text();
        revalidatePath("/dashboard/profile/");
        return { message: data };
    } catch (error) {
        console.error("Error reseting password:", error);
        throw error;
    }
}
