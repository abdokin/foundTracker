import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { getAllReclamations } from "@/lib/items-management"
import { getAllUsers } from "@/lib/auth"



export default async function ReclmationPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: number;
        pageSize?: number,
    };
}) {

    const users = await getAllUsers({
        pageNumber: searchParams?.page ?? 0,
        pageSize: searchParams?.pageSize ?? 10,
    });
    return (
        <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex container">
            <DataTable data={users.content} columns={columns} pageCount={users.totalPages} />
        </div>
    )
}
