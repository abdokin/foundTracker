

import { getAllItems } from "@/lib/items-management"
import { ItemFilters } from "@/components/item-filters";
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
        status?: string[],
        date?: Date,
        name: string,
    };
}) {

    const items = await getAllItems({
        pageNumber: searchParams?.page ?? 0,
        pageSize: searchParams?.pageSize ?? 10,
    }, {
        status: searchParams?.status,
        date: searchParams?.date,
        name: searchParams?.name,

    });
    const user: User = JSON.parse(cookies().get("current_user")?.value!!);
    return (
        <main className="flex items-start ">
            <ItemFilters />
            <ListItems items={items} isAdmin={user.role !== "USER"} />
        </main >
    )
}
