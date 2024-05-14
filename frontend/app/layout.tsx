import type { Metadata } from "next";
import { Inter ,Roboto} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Roboto({
  subsets: ['latin'],
  weight: "300"
});

export const metadata: Metadata = {
  title: "University Lost Objects Tracker",
  description: "Report lost objects and help reunite them with their owners.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        // "container max-w-7xl mx-auto"
      )}>
        {/* {JSON.stringify(cookies().getAll())} */}
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
