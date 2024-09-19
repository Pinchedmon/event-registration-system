import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function AuthPage() {
  const session = await getServerAuthSession();
  console.log(session);
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text p-2 text-2xl font-bold text-transparent">
          Мероприятия 2024
        </span>

        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
          <h1 className="text-center text-2xl font-bold text-black">
            Рады видеть вас снова!
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
