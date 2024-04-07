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
import { LoginInput } from "@/lib/types";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginInput) {
    const res = await login(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
