"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosNotificationsOutline } from "react-icons/io";

export function NoticiationsCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button   size={'icon'}  className="relative h-6 w-6  rounded-full borderd-none">
          <IoIosNotificationsOutline size={'28'}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-4" align="end" forceMount>
        <h1>Notifications</h1>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
