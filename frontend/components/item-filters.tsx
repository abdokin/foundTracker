"use client"

import { useState } from "react"
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export function ItemFilters() {

    return (
        <div className="w-[400px] bg-zinc-50 min-h-screen p-4 flex flex-col gap-4">
            <h1 className="text-xl">Filters</h1>
            <div className="flex flex-col gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search objets..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
            </div>

            <h3 className="text-md">By Statuse</h3>
            <hr />
            <div className="flex flex-col gap-4 px-4 ">
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        ALL
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Claimed
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Found
                    </label>
                </div>

            </div>

            <h3 className="pt-4">Date Added</h3>
            <hr />
            <RadioGroup defaultValue="all" className="px-4 pt-4 flex  flex-col gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="all">Any Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="last-year">In The last year</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="last-month">In The last month</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="last-day">In The last day</Label>
                </div>
            </RadioGroup>

        </div>
    )
}