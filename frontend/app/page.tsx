import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="h-screen min-h-screen container  text-white">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Never Lose Your Belongings Again
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our Lost Objects Tracker app helps you locate your lost items in real-time, connect with a community
                  of users, and recover your belongings with ease.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/auth/login"
                >
                  <Button>Login</Button>
                </Link>
                <Link
                  href="/auth/register"
                >
                  <Button variant={'secondary'}>Register</Button>
                </Link>
              </div>
            </div>
            <img
              alt="Lost Objects Tracker"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="/logo.png"
              width="550"
            />
          </div>
        </div>
      </section>


    </div>
  );
}
