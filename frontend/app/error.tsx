
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {


    return (
        <main className="flex flex-col items-center justify-center h-screen px-4 md:px-6 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50">404</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">{error.message}</p>
                <div className="flex gap-2">
                    <Button onClick={() => reset()}>Try Again</Button>
                    <Link href='/'>
                        <Button >Go Home</Button>
                    </Link>
                </div>

            </div>
        </main>
    )
}