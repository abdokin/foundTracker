"use client"
import { Item, Page } from "@/lib/types";
import AddItemForm from "./add-item-form";
import ItemCard from "./item-card";
import ServerPagination from "./pagination";
import { useState } from "react";

export default function ListItems({ items, isAdmin }: { items: Page<Item>, isAdmin: boolean }) {
    return (
        <div className="px-2">
            {items.content.length > 0 && <>
                <div className="flex justify-end py-4">
                    {isAdmin && <AddItemForm />}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {items.content.map(it => <ItemCard key={it.id} item={it} isAdmin={isAdmin} />)}
                </div>
                <div className="flex items-center p-4">
                    <ServerPagination data={items.pageable} totalPages={items.totalPages} />
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-{items.pageable.pageSize}</strong> of <strong>{items.totalElements}</strong>{" "}
                        products
                    </div>
                </div>
            </>}
            {items.content.length == 0 && <div className="p-16">
                <h1 className="text-xl mx-auto text-center">No Items Found {isAdmin && <AddItemForm />}</h1>
            </div>}

        </div>
    )
}