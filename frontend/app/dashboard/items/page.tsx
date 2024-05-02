

import { getAllItems } from "@/lib/items-management"
import ItemCard from "@/components/item-card"
import ServerPagination from "@/components/pagination"
import { ItemFilters } from "@/components/item-filters";
import AddItemForm from "@/components/add-item-form";

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
    return (
        <main className="flex  items-start ">
            <ItemFilters />
            <div className="px-2">
                <div className="flex justify-end py-4">
                <AddItemForm />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
                    {items.data.content.map(it => <ItemCard key={it.id} item={it} />)}
                </div>
                <ServerPagination data={items.data.pageable} totalPages={items.data.totalPages} />
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{items.data.pageable.pageSize}</strong> of <strong>{items.data.totalElements}</strong>{" "}
                    products
                </div>
            </div>
        </main >
    )
}
