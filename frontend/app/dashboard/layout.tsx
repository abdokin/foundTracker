
import { cookies } from "next/headers";
import { User } from "@/lib/types";
import NavBar from "@/components/nav-bar";
import Link from "next/link";
import { getAllNotifications } from "@/lib/notifications";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User = JSON.parse(cookies().get("current_user")?.value!!);
  let notifications= null;
  try {
    notifications= await getAllNotifications({
      pageNumber: 0,
      pageSize: 30
    });
  }catch(e) {
    
  }
  return (
    <div className="flex min-h-screen w-full flex-col">

      {notifications && <NavBar user={user} notifications={notifications} />}

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40  p-4">
        {children}
      </main>
    </div>
  );
}
