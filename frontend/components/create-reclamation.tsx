"use client"
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
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ClaimItem } from "@/lib/items-management";
import { useState } from "react";


export default function CreateReclamationFrom({
    objetId
}: {
    objetId: number;
}) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateReclamationInput>({
        defaultValues: {
            objetId: objetId,
            description: "",
            sujet: "",
            docs: [],
        },
    });

    const addFiles = (docs: File[] | null) => {
        if (docs && docs.length > 5) {
            toast.error("Max Files allowed is 5 documents");

        }
        // @ts-ignore
        form.setValue('docs', docs?.slice(0, 5));

    };



    async function onSubmit(values: CreateReclamationInput) {
        console.log("submited", values);
        const formData = new FormData();
        // @ts-ignore
        formData.append('itemId', values.objetId);

        formData.append('sujet', values.sujet);
        formData.append('description', values.description);

        values.docs.forEach((doc, index) => {
            formData.append(`docs`, doc, doc.name);
        });

        console.log(formData);

        const res = await ClaimItem(formData);
        if ('timestamp' in res) {
            console.log(res);

            if (res.errors) {
                res.errors.map((it) => {
                    // @ts-ignore
                    form.setError(it.field, {
                        message: it.message,
                    });
                });
            }
            toast.error(res.message, {
                description: res.timestamp,
            });
        } else {
            toast.success("Reclamation created Successfull");
            form.reset();
            setOpen(false);
        }
    }


    return (
        <Sheet onOpenChange={setOpen} open={open} >
            <SheetTrigger>Claim</SheetTrigger>
            <SheetContent className="sm:max-w-3xl w-full">
                <SheetHeader>
                    <SheetTitle>Create Reclamation</SheetTitle>
                    <SheetDescription>
                        If you have lost an object and believe it can be recovered, you can create a reclamation to start the process of retrieving your lost item. A reclamation is a formal request or claim made to an authority or organization to assist in finding and returning a lost item to its rightful owner. Please provide accurate details about the lost object to help expedite the search and recovery process.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  ">

                        <div className="flex flex-col gap-8">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="sujet"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sujet</FormLabel>
                                            <FormControl>
                                                <Input placeholder="enter reclamation sujet"{...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="enter reclamation description" rows={5} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="docs"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <UploadFiles field={field} addFiles={addFiles} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <SheetFooter className="py-4 mx-auto">
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>

                </Form>

            </SheetContent>
        </Sheet>


    );
}
