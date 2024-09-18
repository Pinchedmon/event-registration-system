import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { LoginForm } from "./_components/LoginForm";

export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b">
        <div className="container flex items-center justify-center gap-12 px-4 py-16">
          <div>
            <h1 className="mb-4 text-center text-2xl font-bold text-black">
              Рады видеть вас снова!
            </h1>
            <LoginForm className="md:px0 w-screen max-w-96 px-0" />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
