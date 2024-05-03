

import { getAllItems } from "@/lib/items-management"
import ItemCard from "@/components/item-card"
import ServerPagination from "@/components/pagination"
import { ItemFilters } from "@/components/item-filters";
import AddItemForm from "@/components/add-item-form";
import { cookies } from "next/headers";
import { User } from "@/lib/types";
import ListItems from "@/components/list-items";


export default async function Dashboard({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: number;
        pageSize?: number,
    };
}) {

    const items = await getAllItems({
        pageNumber: searchParams?.page ?? 0,
        pageSize: searchParams?.pageSize ?? 10,
    });
    const user: User = JSON.parse(cookies().get("current_user")?.value!!);
    return (
        <main className="flex items-start ">
            <ItemFilters />
            <ListItems items={items} isAdmin={user.role == "RECE"} />
        </main >
    )
}
