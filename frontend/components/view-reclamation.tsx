"use client"
import { Reclamation } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { statuses } from "@/app/dashboard/reclamations/data/data";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/constants";
import PdfViewer from "./pdf-view";
import { useEffect, useState } from "react";
import PDFViewer from "./pdf-view";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export default function ViewReclamation({ reclamation }: { reclamation: Reclamation }) {
    const [files, setFiles] = useState<(string | File)[]>([]);

    const status = statuses.find((status) => status.value === reclamation.status);

    if (status == null) throw new Error('status null /����');

    useEffect(() => {
        const fetchFiles = async () => {
            const updatedFiles = await Promise.all(
                reclamation.docs.map(async (doc) => {
                    const isPdfFile = doc.documentUrl.endsWith('.pdf');
                    const url = `${API_URL}/files/${doc.documentUrl}`;

                    if (isPdfFile) {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const file = new File([blob], `${doc.documentUrl}.pdf`, {
                            type: 'application/pdf',
                        });
                        return file;
                    } else {
                        return url;
                    }
                })
            );

            setFiles(updatedFiles);
        };

        fetchFiles();
    }, [reclamation.docs]);

    return (
        <div className="grid grid-cols-2 gap-8 border p-4 rounded-md shadow-md">
            <div className="px-4">
                <h1 className="text-3xl font-bold mb-4">Reclamation Details</h1>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold pt-4">Subject</h2>
                    <p className="text-gray-600">{reclamation.sujet}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold pt-4">Description</h2>
                    <p className="text-gray-600">{reclamation.description}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold pt-4">User Information</h2>
                    <p className="text-gray-600">
                        {reclamation.user.firstname} {reclamation.user.lastname}
                    </p>
                    <p className="text-gray-600">{reclamation.user.email}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold pt-4">Status</h2>
                    <div
                        className={cn(
                            'flex items-center border rounded-md px-2 py-1 w-fit',
                            status.class
                        )}
                    >
                        {status.icon && (
                            <status.icon
                                className={cn('mr-2 h-4 w-4', status.class)}
                            />
                        )}
                        <span>{status.label}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <h2 className="text-lg font-semibold pt-4">Attachments</h2>

                <Carousel>
                    <CarouselContent>
                        {reclamation.docs.map((doc, index) => {
                            const isPdfFile = doc.documentUrl.endsWith('.pdf');
                            const url = `${API_URL}/files/${doc.documentUrl}`;

                            return (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    {!isPdfFile && (
                                        <img
                                            key={index}
                                            src={url}
                                            className=" "
                                        />
                                    )
                                    }
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>

                </Carousel>
                <div>
                    {reclamation.docs.map((doc, index) => {
                        const isPdfFile = doc.documentUrl.endsWith('.pdf');
                        const url = `${API_URL}/files/${doc.documentUrl}`;

                        return isPdfFile ? (
                            <PDFViewer url={url} />
                        ) : null
                    }
                    )}
                </div>
            </div>
        </div >
    );
}