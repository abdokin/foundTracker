import { Reclamation } from "@/lib/types";
import { statuses } from "@/app/dashboard/reclamations/data/data";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { getReclamation } from "@/lib/items-management";
import ViewReclamation from "@/components/view-reclamation";
import { RecmlamationDetails } from "@/components/recmlamation-details";

export default async function Page(props: {
  params: {
    id: number
  }
}) {
  const reclamation = await getReclamation(props.params.id);

  return (
    <div className="container "><RecmlamationDetails reclamation={reclamation} /></div>
  )
}