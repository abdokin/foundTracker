
import { getReclamationByCode } from "@/lib/items-management";
import { RecmlamationDetails } from "@/components/recmlamation-details";
import { cookies } from "next/headers";
import { User } from "@/lib/types";
import { ReclamationSearch } from "@/components/reclmation-search";


export default async function ViewReclmationPage({
    searchParams,
}: {
    searchParams?: {
        reclamationCode?: string;
    };
}) {
    const reclamation = await getReclamationByCode(searchParams?.reclamationCode ?? "");
    const user: User = JSON.parse(cookies().get("current_user")?.value!!);

    return (
        <main className="p-8 flex   gap-4  items-center">
            <div className="space-y-4 pt-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Track your Reclmation Status</h1>
                    <p className="text-gray-600 dark:text-gray-400">Enter your reclamation code to get your reclmation details.</p>
                </div>
                <ReclamationSearch />
            </div>
            <div className="flex w-full col-span-2  justify-center p-4 ">
                {reclamation && <RecmlamationDetails reclamation={reclamation} user={user} />}
                {!reclamation && <div className="text-2xl  text-center">No Reclmation Found</div>}
            </div>
        </main>
    )
}