"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AddItemInput } from "@/lib/types";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import ImagesUpload from "./upload-image";
import { AddItem } from "@/lib/items-management";
import { Textarea } from "./ui/textarea";


export default function AddItemForm() {
    const [open, setOpen] = useState(false);
    const form = useForm<AddItemInput>({
        defaultValues: {
            name: "",
            description: "",
            images: [],
        },
    });
    const addImages = (images: File[]) => {
        console.log("updating images", images);
        form.setValue("images", images)
    }
    async function onSubmit(values: AddItemInput) {
        console.log("submited", values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);

        values.images.forEach((image, index) => {
            formData.append(`images`, image, image.name); // Specify file name
        });

        console.log(formData);

        const res = await AddItem(formData);
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
            toast.success("Objet created Successfull");
            form.reset();
            setOpen(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Item
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className=" p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Create Item</CardTitle>
                                <CardDescription>
                                    report item found
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter item name" {...field} />
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
                                                    <Textarea placeholder="enter item description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                    <ImagesUpload field={field} addImages={addImages} />
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
            </DialogContent>
        </Dialog>
    );
}
