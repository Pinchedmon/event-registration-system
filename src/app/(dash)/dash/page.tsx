import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import TeamSwitcher from "./_components/team-switcher";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "./_components/navbar";

export default async function AuthPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      {/* <main className=""> */}
      {/* <nav className="flex items-center justify-between">
          <Link
            href="/home"
            className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            admin panel
          </Link>
          <div className="flex gap-4">
            <Link href={"/signup"} className="hidden md:block">
              <Button variant={"outline"}>Зарегистрироваться</Button>
            </Link>
            <Link href={"/login"}>
              <Button className="bg-blue-500">Вход</Button>
            </Link>
          </div>
        </nav> */}

      <div className="flex-col md:flex">
        <div className="border-b">
          {/* <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
              <Link
                href="/examples/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Overview
              </Link>
              <Link
                href="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Customers
              </Link>
              <Link
                href="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Products
              </Link>
              <Link
                href="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Settings
              </Link>
            </nav>
            
          </div> */}
          <Navbar />
        </div>
      </div>
      {/* </main> */}
    </HydrateClient>
  );
}

// import { MainNav } from "@/app/(app)/examples/dashboard/components/main-nav";
// import { Overview } from "@/app/(app)/examples/dashboard/components/overview";
// import { RecentSales } from "@/app/(app)/examples/dashboard/components/recent-sales";
// import { Search } from "@/app/(app)/examples/dashboard/components/search";
// import TeamSwitcher from "@/app/(app)/examples/dashboard/components/team-switcher";
// import { UserNav } from "@/app/(app)/examples/dashboard/components/user-nav";
