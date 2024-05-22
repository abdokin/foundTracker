"use client"
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function ReclamationSearch() {
    const searchParams = useSearchParams();
    const { replace, refresh } = useRouter();
    const pathname = usePathname();
    const [code, setCode] = useState<string>(searchParams.get('reclamationCode') ?? "");
    const hanldeFilter = () => {
        const queryParams = new URLSearchParams(searchParams);

        if (code) {
            queryParams.set('reclamationCode', code);
        } else {
            queryParams.delete('reclamationCode')
        }
        const queryString = queryParams.toString();
        replace(`${pathname}?${queryString}`);
    }

    const hanldeFilterClear = () => {
        const queryParams = new URLSearchParams(searchParams);
        queryParams.delete('reclamationCode')
        const queryString = queryParams.toString();
        replace(`${pathname}?${queryString}`);
    }



    return (
        <form className="space-y-4">
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    htmlFor="reclamation-code"
                >
                    Reclamation Code
                </label>
                <div className="mt-1">
                    <Input
                        id="reclamation-code"
                        className=""
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                        placeholder="Enter your reclamation code"
                        type="text"
                    />
                </div>
                <Button className="mt-2" onClick={() => {
                    hanldeFilter()
                }}>View Details</Button>
                <Button className="mt-2 ml-2" onClick={() => {hanldeFilterClear()}} variant={'destructive'}>Clear</Button>

            </div>
        </form>
    )
}