import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {/* {JSON.stringify(cookies().getAll())} */}
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
