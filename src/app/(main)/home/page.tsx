import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Event } from "./_components/event";
import { EventGroup } from "./_components/event-group";
export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="t flex min-h-screen justify-center">
        <div className="container flex h-screen flex-col gap-4 px-4 py-8 md:gap-12">
          <nav className="flex items-center justify-between">
            <Link
              href="/home"
              className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
            >
              Мероприятия 2024
            </Link>
            <div className="flex gap-4">
              <Link href={"/signup"} className="hidden md:block">
                <Button variant={"outline"}>Зарегистрироваться</Button>
              </Link>
              <Link href={"/login"}>
                <Button className="bg-blue-500">Вход</Button>
              </Link>
            </div>
          </nav>
          <EventGroup title="Совсем скоро" items={[]} />
        </div>
      </main>
    </HydrateClient>
  );
}
