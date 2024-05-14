"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Reclamation } from "@/lib/types"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { acceptReclamtion, rejectReclamtion } from "@/lib/items-management"
import ViewReclamation from "@/components/view-reclamation";
import Link from "next/link";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends Reclamation>({
  row,
}: DataTableRowActionsProps<TData>) {
  const reclamation: Reclamation = row.original

  return (

    <div className="flex gap-2">
      {/* <ViewReclamation reclamation={reclamation} /> */}
      <Link href={`/dashboard/reclamations/${reclamation.id}`}>
        <Button variant={'secondary'}>Details</Button>
      </Link>
      {(reclamation.status === "PENDING" || reclamation.status === "APPROVED") && <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'destructive'} size={'sm'}>Reject</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              const res = await rejectReclamtion(reclamation.id);
              if ('timestamp' in res) {
                toast.error(res.message, {
                  description: res.timestamp,
                });
              } else {
                toast.success("Reclamation Rejected");
              }
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>}
      {(reclamation.status === "PENDING" || reclamation.status === "REJECTED") && <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={'sm'}>Accept</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              const res = await acceptReclamtion(reclamation.id);
              if ('timestamp' in res) {
                toast.error(res.message, {
                  description: res.timestamp,
                });
              } else {
                toast.success("Reclamation Accepted");
              }
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>}
    </div>

  )
}
