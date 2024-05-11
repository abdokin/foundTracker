"use client"

import { ColumnDef } from "@tanstack/react-table"



import { statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "@/components/ui/checkbox"
import { FileArchiveIcon, FileIcon } from "lucide-react"
import { Document, Reclamation, User } from "@/lib/types"
import { API_URL } from "@/lib/constants"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export const columns: ColumnDef<Reclamation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Reclmation" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },


  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue('user');
      return (
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/avatars/01.png"
                alt={user.firstname.slice(0, 2)}
              />
              <AvatarFallback>{user.firstname.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{`${user.firstname} ${user.lastname}`}</span>
            <span className="text-xs text-gray-500 truncate">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sujet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sujet" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("sujet")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "docs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="documents" />
    ),
    cell: ({ row }) => {
      const documents: Document[] = row.getValue("docs");
      const previewImage = (url: string) => (
        <img src={API_URL + "/files/" + url} alt="Document Preview" className="max-w-[60px]" />
      );

      const displayImageOrIcon = (url: string) => {
        const extension = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
        if (extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "gif" || extension === "webp") {
          return previewImage(url);
        } else if (extension === "pdf") {
          return <Link href={API_URL + "/files/" + url} target='_blank'><FileIcon size={22} className="w-[60px] h-[60px]" /></Link>;
        } else {
          return <span>Unsupported file type</span>;
        }
      };

      return (
        <div className="flex space-x-2">
          {documents.map((document, index) => (
            <span key={index} className="max-w-[100px]">
              {displayImageOrIcon(document.documentUrl)}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
