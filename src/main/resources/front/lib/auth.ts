"use server";
import { cookies } from "next/headers";
import { API_URL } from "./constants";
import { ApiResponse, AuthResponse, LoginInput, RegisterInput } from "./types";
import { redirect } from "next/navigation";

export async function login(
  values: LoginInput
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await fetch(API_URL + "/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data: ApiResponse<AuthResponse> = await response.json();
    if (data.data) {
      cookies().set("access_token", data.data.access_token);
      cookies().set("refresh_token", data.data.refresh_token);
      cookies().set("current_user", JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
export async function register(
  values: RegisterInput
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await fetch(API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data: ApiResponse<AuthResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    const response = await fetch(API_URL + "/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      cookies().delete("access_token");
      cookies().delete("refresh_token");
      cookies().delete("current_user");
      redirect("/");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}
