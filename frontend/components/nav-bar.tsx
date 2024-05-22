"use client"
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "@/components/user-nav";
import { Notification, Page, User } from "@/lib/types";
import { usePathname } from "next/navigation";
import { cx } from "class-variance-authority";
import NotificationsList from "./notifications-list";
import ErrorBoundary from "./ErrorBoundry";


export default function NavBar({ user, notifications }: { user: User, notifications: Page<Notification> }) {
    const path = usePathname();
    const isAdmin = user.role !== "USER";

    const links = [
        { path: "/dashboard", label: "Overview", show: isAdmin},
        { path: "/dashboard/items", label: "Items", show: true },
        { path: "/dashboard/reclamations", label: "Reclamations", show: true },

    ];

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-primary  px-4 md:px-6  z-10">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                {links.map((link) => {
                    return (link.show && <Link key={link.path} href={link.path} className={cx(
                        path === link.path ? "bg-white px-4 py-2 rounded-md text-primary" : " text-white",
                        "text-bold text-md transition-all"
                    )}>
                        {link.label}
                    </Link>)
                }
                )}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        {links.map((link) => (
                            <Link key={link.path} href={link.path} className={cx(
                                path === link.path ? "bg-white px-4 py-2 rounded-md text-primary" : " text-white",
                                "text-bold text-lg transition-all"
                            )}>
                                {link.label}

                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search objets..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <ErrorBoundary>
                    <NotificationsList notifications={notifications} />
                </ErrorBoundary>
                <UserNav user={user} />
            </div>
        </header>
    );
}
