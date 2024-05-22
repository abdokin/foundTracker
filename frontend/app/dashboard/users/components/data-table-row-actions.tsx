"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"

import Link from "next/link";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends User>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user: User = row.original

  return (

    <div className="flex gap-2">
      <Link href={`/dashboard/users/${user.id}`}>
        <Button variant={'secondary'}>Details</Button>
      </Link>

    </div>

  )
}
