"use client"
import { ApiResponse, Item, Page } from "@/lib/types";
import AddItemForm from "./add-item-form";
import ItemCard from "./item-card";
import ServerPagination from "./pagination";
import { useState } from "react";

export default function ListItems({ items, isAdmin }: { items: ApiResponse<Page<Item>>, isAdmin: boolean }) {
    return (
        <div className="px-2">
            {items.data.content.length > 0 && <>
                <div className="flex justify-end py-4">
                    <AddItemForm />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {items.data.content.map(it => <ItemCard  key={it.id} item={it} isAdmin={isAdmin} />)}
                </div>
                <div className="flex items-center p-4">
                    <ServerPagination data={items.data.pageable} totalPages={items.data.totalPages} />
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-{items.data.pageable.pageSize}</strong> of <strong>{items.data.totalElements}</strong>{" "}
                        products
                    </div>
                </div>
            </>}
            {items.data.content.length == 0 && <div className="p-16">
                <h1 className="text-xl mx-auto text-center">No Items Found <AddItemForm /></h1>
            </div>}

        </div>
    )
}