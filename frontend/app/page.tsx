import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="h-screen min-h-screen container  text-white">
      <nav className="flex items-center w-full bg-white px-8 border-b">
        <div className="bg-white p-4 text-black font-bold text-2xl">
          {/* <span>Lost Objects Tracker</span> */}
          <img src="/logo.png" alt="" width={120} height={120} />
        </div>
        <div className="flex gap-2 items-center ml-auto">
          <Link href={"/auth/login"}>
            <Button>Report Lost Object</Button>
          </Link>
          <Link href={"/auth/register"}>
            <Button>Register</Button>
          </Link>
        </div>
      </nav>
      <main className="flex flex-col items-center justify-between  text-black mt-8">
        <h1 className="text-3xl font-bold">Welcome To Système de Gestion des Objets Trouvés au FSAC </h1>
      </main>
    </div>
  );
}
