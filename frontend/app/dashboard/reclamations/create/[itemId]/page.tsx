"use client"
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CreateReclamationInput } from "@/lib/types";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import UploadFiles from "@/components/upload-files";
import { XIcon } from "lucide-react";

// Memoized FileItem component to prevent unnecessary re-renders
const FileItem = React.memo(({ file, index, onRemove }: { file: File, index: number, onRemove: () => void }) => (
    <div className="relative border w-full">
        <button className="absolute top-0 right-0 bg-black text-white z-50 p-2" onClick={() => onRemove()}><XIcon size={18} /></button>
        {file.type.startsWith('image/') ? (
            <img src={URL.createObjectURL(file)} className="w-full h-full" />
        ) : (
            <iframe key={index} src={URL.createObjectURL(file)} className="w-full h-full" />
        )}
    </div>
));


export default function CreateReclamationPage() {
    const [files, setFiles] = useState<File[] | null>(null);
    const form = useForm<CreateReclamationInput>({
        defaultValues: {
            description: "",
            docs: [],
        },
    });

    const addFiles = (docs: File[]) => {
        console.log("updating files");
        if(docs.length > 5) {
            toast.error("Max Files allowed is 5 documents");
        }
        form.setValue('docs', docs.slice(0, 5));
        setFiles(docs.slice(0, 5));
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prevImages => {
            if (prevImages) {
                return prevImages?.filter((_, i) => i !== index)
            }
            return prevImages;
        });
    };

    async function onSubmit(values: CreateReclamationInput) {
        console.log("submited", values);
        toast.success("Not implemented")
    }

    // Memoize the list of files to prevent re-renders when the component re-renders
    const memoizedFiles = useMemo(() => {
        if (!files || files.length === 0) return null;
        return (
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
                {files.map((file, index) => (
                    <FileItem key={index} index={index} file={file} onRemove={() => handleRemoveFile(index)} />
                ))}
            </div>
        );
    }, [files]);

    return (
        <div className="w-full grid grid-cols-3 gap-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Create Reclamation  </CardTitle>
                            <CardDescription>Claim </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {/* <PDFViewer /> */}
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="enter item description" rows={15} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="docs"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <UploadFiles isThereIsFiles={(files?.length ?? 0) > 0} field={field} addFiles={addFiles} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Save</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <div className="w-full col-span-2">
                {!memoizedFiles && <h1 className="p-4 text-xl">Please Select File to Send with Reclamation</h1>}
                {memoizedFiles}
            </div>
        </div>
    );
}
