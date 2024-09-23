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

interface Props {
  className?: string;
  email: string;
  id: string;
}

export const ProfileBar: React.FC<Props> = ({ className, email, id }) => {
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
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ProfileEdit id={id} />
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
