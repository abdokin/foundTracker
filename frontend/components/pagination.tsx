import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Pageable } from "@/lib/types"

export default function ServerPagination({ data, totalPages }: { data: Pageable, totalPages: number }) {
    const previews = Math.max(data.pageNumber - 1, 0); // Ensure previews doesn't go below 0
    const next = Math.min(data.pageNumber + 1, totalPages - 1); // Ensure next doesn't exceed totalPages

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious aria-disabled={data.pageNumber == 0} href={`?pageSize=${data.pageSize}&page=${previews}`} className={""} />
                </PaginationItem>
                {/* Example: Render page numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={`?pageSize=${data.pageSize}&page=${index}`} className={""}>{index + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem  >
                    <PaginationNext aria-disabled={data.pageNumber == totalPages - 1} href={`?pageSize=${data.pageSize}&page=${next}`} className={""} children={undefined} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}