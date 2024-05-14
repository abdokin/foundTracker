"use server";
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { AuthResponse, ErrorResponse, LoginInput, Page, Pagination, RegisterInput, User } from "./types";
import { redirect } from "next/navigation";
import assert from "assert";

export async function login(
  values: LoginInput
): Promise<AuthResponse | ErrorResponse> {
  try {
    const response = await fetch(API_URL + "/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data: AuthResponse = await response.json();
      cookies().set("token", data.token);
      cookies().set("current_user", JSON.stringify(data.user));
      return data;
    }
    const errorRespose: ErrorResponse = await response.json();
    return errorRespose;


  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function register(
  values: RegisterInput
): Promise<AuthResponse | ErrorResponse> {
  try {
    const response = await fetch(API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const errorRespose: ErrorResponse = await response.json();
      return errorRespose;
    }
    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  cookies().delete("token");
  cookies().delete("current_user");
  redirect("/");

}





export async function getAllUsers(
  values: Pagination
): Promise<Page<User>> {
  const token = cookies().get("token")

  assert(token && token.value != ""); // it always should exist
  try {
    const response = await fetch(API_URL + `/management/users/?page=${values.pageNumber}&size=${values.pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token?.value}`
      },
    });
    // if (response.status === 403) {
    //   throw new Error("Unauthorized access. Please log in again.");
    // }
    console.log(response);
    
    if (!response.ok) {
      const errorRespose: ErrorResponse = await response.json();
      throw new Error(errorRespose.message);
    }
    const data: Page<User> = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading items:", error);
    throw error;
  }
}

