"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { EditProfileInput } from "@/lib/types";
import { toast } from "sonner";


export default function EditProfileForm() {
    const form = useForm<EditProfileInput>({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: ""
        },
    });
    async function onSubmit(values: EditProfileInput) {
        toast.success("Not Implemented");
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Profile Info</CardTitle>
                        <CardDescription>
                            update your profile Inforomation
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your firstname" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Save</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
