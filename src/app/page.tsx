import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="t flex min-h-screen justify-center bg-gradient-to-b from-white to-black/40">
        <div className="container gap-12 px-4 py-16">
          <div>
            <h1 className="text-2xl font-bold text-black">
              Сайт с мероприятиями
            </h1>
            <Link href={"/auth"}>
              <Button>Вход</Button>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
