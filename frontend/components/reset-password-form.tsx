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
import { ResetPasswordInput } from "@/lib/types";
import { toast } from "sonner";
import { resetPassword } from "@/lib/profile-management";


export default function ResetPasswordForm() {
    const form = useForm<ResetPasswordInput>({
        defaultValues: {
            newPassword: "",
            currentPassword: "",
            confirmationPassword: ""
        },
    });
    async function onSubmit(values: ResetPasswordInput) {
        const res = await resetPassword(values);
        console.log(values, res);
        if ('timestamp' in res) {
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
            toast.success("Password reseted successuflly");
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Change Password</CardTitle>
                        <CardDescription>
                            Reset your Password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your old password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter your new password" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="confirmationPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="re-enter your new password" {...field} type="password" />
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
