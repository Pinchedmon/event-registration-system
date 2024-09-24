"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TeamSwitcher from "./team-switcher";
import { ProfileBar } from "@/components/shared/profile/profile-bar";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  return (
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {session.data && (
          <TeamSwitcher
            id={session.data?.user.id}
            email={session.data?.user.email}
          />
        )}
        <div className="flex w-full gap-8">
          <Link
            href="/dash/events"
            className={clsx(
              pathname == "/dash/events"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Мероприятия
          </Link>

          <Link
            href="/dash/teams"
            className={clsx(
              pathname == "/dash/teams"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Команды
          </Link>

          {/* <Link
            href="/my/done"
            className={clsx(
              pathname == "/my/done"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Участники
          </Link> */}
          <Link
            href="/dash/users"
            className={clsx(
              pathname == "/dash/users"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Пользователи
          </Link>
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="text-white" side="left">
          <nav className="grid gap-12 text-2xl font-bold">
            <Link
              href="/dash/events"
              className={clsx(
                pathname == "/dash/events"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Мероприятия
            </Link>

            <Link
              href="/dash/team"
              className={clsx(
                pathname == "/dash/team"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Команды
            </Link>

            {/* <Link
              href="/my/done"
              className={clsx(
                pathname == "/my/done"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Участники
            </Link> */}
            <Link
              href="/dash/users"
              className={clsx(
                pathname == "/dash/users"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Пользователи
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {session.data && (
        <ProfileBar
          email={session.data?.user.email}
          id={session.data?.user.id}
        />
      )}
    </div>
  );
};
export default memo(Navbar);
