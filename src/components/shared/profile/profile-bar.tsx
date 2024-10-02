import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ProfileEdit } from "./profile-edit";
import { CircleUser } from "lucide-react";
import { signOut } from "next-auth/react";
import { MyEvents } from "./my-events";
import Link from "next/link";

interface Props {
  className?: string;
  email: string;
  id: string;
  role: string;
}

enum Roles {
  ADMIN = "Администратор",
  ORGANIZER = "Организатор",
  REGISTRATOR = "Регистратор",
  USER = "Пользователь",
}

export const ProfileBar: React.FC<Props> = ({ className, email, id, role }) => {
  return (
    <div className={cn(className, "ml-auto flex items-center space-x-4")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="flex h-8 w-8 items-center justify-center">
              <CircleUser size={24} />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{email}</p>
              <p className="text-sm text-gray-400">
                {Roles[role as keyof typeof Roles]}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/dash"}>
            <DropdownMenuItem>Админ панель</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <ProfileEdit id={id} />
          <DropdownMenuSeparator />
          <MyEvents id={id} />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
