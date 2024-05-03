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
import { EditProfileInput, User } from "@/lib/types";
import { toast } from "sonner";
import { updateProfileInfo } from "@/lib/profile-management";


export default function EditProfileForm({ user }: { user: User }) {
    const form = useForm<EditProfileInput>({
        defaultValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        },
    });
    async function onSubmit(values: EditProfileInput) {
        const res = await updateProfileInfo(values);
        console.log(values, res);
        if (!res.success) {
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
            toast.success(res.message, {
                description: res.timestamp,
                action: {
                    label: "undo",
                    onClick: () => console.log("Undo"),
                },
            });
        }
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
