"use client"
import React, { useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from './ui/button';

export function ItemFilters() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [name, setName] = useState<string | undefined>();
    const [status, setStatus] = useState<string[] | undefined>([]);
    const [date, setDate] = useState<Date | undefined>();

    const handleStatusCheckbox = (value: string) => {
        if (status?.includes(value)) {
            setStatus(status.filter((statusValue) => statusValue !== value));
        } else {
            setStatus([...status ?? [], value]);
        }
    };

    const hanldeFilter = () => {
        const queryParams = new URLSearchParams(searchParams);

        if (name) {
            queryParams.set('name', name);
        } else {
            queryParams.delete('name')
        }

        if (status && status.length > 0) {
            queryParams.set('status', status.join(','));
        } else {
            queryParams.delete('status')

        }
        if (date) {
            queryParams.set('date', date.toISOString());
        } else {
            queryParams.delete('date')

        }
        const queryString = queryParams.toString();
        replace(`${pathname}?${queryString}`);
    }

    useEffect(() => {
        // set filters from searchparams
        const d = searchParams.get('date');
        setName(searchParams.get('name') ?? undefined)
        setStatus(searchParams.has('status') ? searchParams.get('status')?.split(',') : undefined)
        setDate(d ? new Date(d) : undefined);

    }, [])
    return (
        <div className="w-[400px] bg-zinc-50 min-h-screen p-4 flex flex-col gap-4">
            <h1 className="text-xl">Filters</h1>
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search objects..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <h3 className="text-md">By Status</h3>
            <hr />

            <div className="flex flex-col gap-4 px-4 ">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="all"
                        onClick={(e) => {
                            if (!status) {
                                setStatus(['CLAIMED', 'FOUND'])
                            } else setStatus(undefined)
                        }}
                        checked={(status?.length ?? 0) === 2}
                    />
                    <label
                        htmlFor="all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        ALL
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="claimed"
                        onClick={() => handleStatusCheckbox('CLAIMED')}
                        checked={status?.includes('CLAIMED') ?? false}
                    />
                    <label
                        htmlFor="claimed"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Claimed
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="found"
                        onClick={() => handleStatusCheckbox('FOUND')}
                        checked={status?.includes('FOUND') ?? false}
                    />
                    <label
                        htmlFor="found"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Found
                    </label>
                </div>
            </div>

            <h3 className="pt-4">Date Added</h3>
            <hr />

            <RadioGroup defaultValue={"all"} className="px-4 pt-4 flex  flex-col gap-4"
                onChange={(e) => {
                    // @ts-ignore
                    switch (e.target.value) {
                        case "all":
                            setDate(undefined);
                            break;
                        case "last-year":
                            const lastYear = new Date();
                            lastYear.setFullYear(lastYear.getFullYear() - 1);
                            setDate(lastYear);
                            break;
                        case "last-month":
                            const lastMonth = new Date();
                            lastMonth.setMonth(lastMonth.getMonth() - 1);
                            setDate(lastMonth);
                            break;
                        case "last-day":
                            const lastDay = new Date();
                            lastDay.setDate(lastDay.getDate() - 1);
                            setDate(lastDay);
                            break;
                        default:
                            setDate(undefined);
                            break;
                    }
                }}

            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={"all"} id="all" />
                    <Label htmlFor={"all"}>Any Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-year" id="last-year" />
                    <Label htmlFor="last-year">In The last year</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-month" id="last-month" />
                    <Label htmlFor="last-month">In The last month</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="last-day" id="last-day" />
                    <Label htmlFor="last-day">In The last day</Label>
                </div>
            </RadioGroup>

            <Button onClick={hanldeFilter}>Filter</Button>
        </div>
    );
}
