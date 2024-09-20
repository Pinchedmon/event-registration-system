"use client";

import clsx from "clsx";
import { Loader } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import TeamSwitcher from "./team-switcher";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <TeamSwitcher />
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
            href="/dash/team"
            className={clsx(
              pathname == "/my/workers"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Команда
          </Link>

          <Link
            href="/my/done"
            className={clsx(
              pathname == "/my/done"
                ? "text-blue-500"
                : "text-muted-foreground",
              "transition-colors hover:text-foreground",
            )}
          >
            Участники
          </Link>
          <Link
            href="/my/done"
            className={clsx(
              pathname == "/my/done"
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
                pathname == "/my/workers"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Команда
            </Link>

            <Link
              href="/my/done"
              className={clsx(
                pathname == "/my/done"
                  ? "text-blue-500"
                  : "text-muted-foreground",
                "transition-colors hover:text-foreground",
              )}
            >
              Участники
            </Link>
            <Link
              href="/my/done"
              className={clsx(
                pathname == "/my/done"
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

      <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default memo(Navbar);
