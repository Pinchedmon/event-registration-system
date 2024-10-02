"use client";
import { ProfileBar } from "@/components/shared/profile/profile-bar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

import React from "react";

export const Navbar = () => {
  const session = useSession();
  return (
    <nav className="flex items-center justify-between">
      <Link
        href="/home"
        className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
      >
        Мероприятия 2024
      </Link>
      <div className="flex gap-4">
        {session.status == "loading" ? (
          "загрузка..."
        ) : session.data?.user.email ? (
          <div>
            <ProfileBar
              email={session.data.user.email}
              id={session.data.user.id}
              role={session.data.user.role}
            />
          </div>
        ) : (
          <>
            <Link href={"/signup"} className="hidden md:block">
              <Button variant={"outline"}>Зарегистрироваться</Button>
            </Link>
            <Link href={"/login"}>
              <Button className="bg-blue-500">Вход</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
