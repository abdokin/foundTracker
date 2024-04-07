import LoginForm from "@/components/login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function Page() {
  if (cookies().has("access_token")) {
    redirect("/dashboard/profile");
  }
  return (
    <main className="container flex justify-center items-center h-screen">
      <LoginForm />
    </main>
  );
}
