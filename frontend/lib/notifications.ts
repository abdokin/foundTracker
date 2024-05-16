"use server"

import { cookies } from "next/headers";
import { Notification, Page, Pagination } from "./types";
import { assert } from "console";
import { API_URL } from "./constants";
import { revalidatePath } from "next/cache";


export async function getAllNotifications(
    values: Pagination
): Promise<Page<Notification>> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/notification?page=${values.pageNumber}&size=${values.pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: Page<Notification> = await response.json();

        return data;
    } catch (error) {
        console.error("Error loading notifications:", error);
        throw error;
    }
}

export async function openNotification(
    notificationId: number
): Promise<Notification> {
    const token = cookies().get("token")

    assert(token && token.value != ""); // it always should exist
    try {
        const response = await fetch(API_URL + `/notification/${notificationId}/open`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token?.value}`
            },
        });
        if (response.status === 403) {
            throw new Error("Unauthorized access. Please log in again.");
        }

        const data: Notification = await response.json();
        revalidatePath("/dashboard/")
        return data;
    } catch (error) {
        console.error("Error loading notifications:", error);
        throw error;
    }
}