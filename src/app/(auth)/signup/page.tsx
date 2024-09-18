import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { SignUpForm } from "./_components/SignUp";
import Link from "next/link";

export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text p-2 text-2xl font-bold text-transparent">
          Мероприятия 2024
        </span>

        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
          <h1 className="mb-4 text-center text-2xl font-bold text-black">
            Добро пожаловать в регистрацию
          </h1>
          <SignUpForm className="md:px0 w-screen max-w-96 px-0" />

          <div className="text-center">
            <p className="mb-0 text-center">Ещё не зарегистрированы?</p>
            <Link className="underline" href="/login">
              Войти
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
