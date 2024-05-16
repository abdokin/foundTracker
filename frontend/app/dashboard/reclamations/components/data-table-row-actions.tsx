"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Reclamation } from "@/lib/types"

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

    </div>

  )
}
