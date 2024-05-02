

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AddItemForm from "@/components/add-item-form"
import { getAllItems } from "@/lib/items-management"
import ItemCard from "@/components/item-card"
import ServerPagination from "@/components/pagination"

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

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">FOUND</TabsTrigger>
                        <TabsTrigger value="draft">CLAIMED</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        <AddItemForm />
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Items</CardTitle>
                            <CardDescription>
                                Manage Lost Items and view thier information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
                                {items.data.content.map(it => <ItemCard key={it.id} item={it} />)}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>1-{items.data.pageable.pageSize}</strong> of <strong>{items.data.totalElements}</strong>{" "}
                                products
                            </div>
                            <ServerPagination data={items.data.pageable} totalPages={items.data.totalPages} />
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
