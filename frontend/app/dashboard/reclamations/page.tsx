import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { getAllReclamations } from "@/lib/items-management"


export default async function ReclmationPage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: number;
        pageSize?: number,
    };
}) {

    const reclamations = await getAllReclamations({
        pageNumber: searchParams?.page ?? 0,
        pageSize: searchParams?.pageSize ?? 10,
    });
    return (
        <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex container">
            <DataTable data={reclamations.content} columns={columns}  pageCount={reclamations.totalPages}/>
        </div>
    )
}
