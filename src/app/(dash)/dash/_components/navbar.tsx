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
        <Link
          href="/home"
          className="text-nowrap bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
        >
          Мероприятия 2024
        </Link>
        {session.data && (
          <TeamSwitcher
            id={session.data?.user.id}
            email={session.data?.user.email}
          />
        )}
        <div className="flex w-full gap-8">
          <Link
            href={
              session.data?.user.role == "ADMIN"
                ? "/dash/eventsForAdmin"
                : "/dash/events"
            }
            className={clsx(
              pathname ==
                (session.data?.user.role == "ADMIN"
                  ? "/dash/eventsForAdmin"
                  : "/dash/events")
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Мероприятия
          </Link>

          <Link
            href={
              session.data?.user.role == "ADMIN"
                ? "/dash/teamsForAdmin"
                : "/dash/teams"
            }
            className={clsx(
              pathname ==
                (session.data?.user.role == "ADMIN"
                  ? "/dash/teamsForAdmin"
                  : "/dash/teams")
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
          {session.data?.user.role == "ADMIN" && (
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
          )}
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
              href={
                session.data?.user.role == "ADMIN"
                  ? "/dash/eventsForAdmin"
                  : "/dash/events"
              }
              className={clsx(
                pathname ==
                  (session.data?.user.role == "ADMIN"
                    ? "/dash/eventsForAdmin"
                    : "/dash/events")
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Мероприятия
            </Link>

            <Link
              href={
                session.data?.user.role == "ADMIN"
                  ? "/dash/teamsForAdmin"
                  : "/dash/teams"
              }
              className={clsx(
                pathname ==
                  (session.data?.user.role == "ADMIN"
                    ? "/dash/teamsForAdmin"
                    : "/dash/teams")
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
            {session.data?.user.role == "ADMIN" && (
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
            )}
          </nav>
        </SheetContent>
      </Sheet>
      {session.status == "loading"
        ? "загрузка..."
        : session.data && (
            <ProfileBar
              email={session.data?.user.email}
              id={session.data?.user.id}
              role={session.data.user.role}
            />
          )}
    </div>
  );
};
export default memo(Navbar);
