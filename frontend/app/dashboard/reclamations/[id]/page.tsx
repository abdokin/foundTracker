import { getReclamation } from "@/lib/items-management";
import { RecmlamationDetails } from "@/components/recmlamation-details";
import { cookies } from "next/headers";
import { User } from "@/lib/types";

export default async function Page(props: {
  params: {
    id: number
  }
}) {
  const reclamation = await getReclamation(props.params.id);
  const user: User = JSON.parse(cookies().get("current_user")?.value!!);

  return (
    <div className="container ">
      <RecmlamationDetails reclamation={reclamation} user={user} />
      </div>
  )
}