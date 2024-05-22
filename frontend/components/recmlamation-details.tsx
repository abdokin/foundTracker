
"use client"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Reclamation, User } from "@/lib/types"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { API_URL } from "@/lib/constants"
import Link from "next/link"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { acceptReclamtion, rejectReclamtion } from "@/lib/items-management"
import { toast } from "sonner";
import { Badge } from "./ui/badge"

export function RecmlamationDetails({ reclamation, user }: { reclamation: Reclamation, user: User }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <div className="space-y-4">
        <div className="md:flex-shrink-0 px-4 py-2w">
          <Carousel>
            <CarouselContent>
              {reclamation.item.images.map((it, index) => <CarouselItem key={index}>
                <img className="h w-full object-cover max-h-56" src={API_URL + "/files/" + it?.imageUrl} alt={reclamation.item.name} />
              </CarouselItem>)}
            </CarouselContent>

          </Carousel>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{reclamation.item.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {reclamation.item.description}
          </p>
          <div className="space-y-2">

            <div>
              <Label htmlFor="subject">Recmalamtion Subject</Label>
              <Input id="subject" readOnly value={reclamation.sujet} />
            </div>
            <div>
              <Label htmlFor="subject">Recmalamtion Status </Label>
              <Badge>{reclamation.status}</Badge>
            </div>
            <div className="pt-1">
              <Label htmlFor="description">Reclamation Description</Label>
              <Textarea id="description" readOnly rows={3}>
                {reclamation.description}
              </Textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">User Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" readOnly value={reclamation.user.firstname + " " + reclamation.user.lastname} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" readOnly value={reclamation.user.email} />
            </div>
          </div>
        </div>
        {user.role !== "USER" && <>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Attachments</h2>
            <div className="space-y-2">
              {reclamation.docs.map((it, index) =>
                <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <FileIcon className="w-6 h-6 text-gray-500" />
                    <div>
                      <p className="font-medium">{it.documentName}</p>
                    </div>
                  </div>
                  <Link target='_blank' href={API_URL + "/files/" + it.documentUrl}>
                    <Button size="icon" variant="ghost">
                      <DownloadIcon className="w-5 h-5" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </Link>
                </div>
              )}

            </div>
          </div>
          <div className="flex gap-2 ">
            {(reclamation.status === "PENDING") && <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'sm'}>Reject</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => {
                    const res = await rejectReclamtion(reclamation.id);
                    if ('timestamp' in res) {
                      toast.error(res.message, {
                        description: res.timestamp,
                      });
                    } else {
                      toast.success("Reclamation Rejected");
                    }
                  }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>}
            {(reclamation.status === "PENDING") && <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'sm'}>Accept</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => {
                    const res = await acceptReclamtion(reclamation.id);
                    if ('timestamp' in res) {
                      toast.error(res.message, {
                        description: res.timestamp,
                      });
                    } else {
                      toast.success("Reclamation Accepted");
                    }
                  }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>}

            {reclamation.status !== "PENDING" &&
              <Link href={API_URL + "/reclamations/export/" + reclamation.code} target='_blank'>
                <Button>Print</Button>
              </Link>
            }
          </div>
        </>}
      </div>
    </div>
  )
}

function DownloadIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function FileIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}
