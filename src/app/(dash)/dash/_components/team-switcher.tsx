"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { api } from "@/trpc/react";
import { Team } from "@/server/api/schema/team";
import { useSession } from "next-auth/react";

import useTeamStore from "@/lib/teamStore";

interface Props {
  className?: string;
  id: string;
  email: string;
}

export default function TeamSwitcher({ className, id, email }: Props) {
  const { setSelectedTeamId } = useTeamStore((state) => state);
  const data = api.team.getMyTeams.useQuery(id);
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null);

  React.useEffect(() => {
    setSelectedTeamId(selectedTeam?.id as string);
  }, [selectedTeam]);
  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedTeam ? selectedTeam.name : <p>{email}</p>}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search team..." />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              <p className="p-2 text-sm text-gray-400">Свой аккаунт</p>
              <CommandItem
                onSelect={() => {
                  setSelectedTeam(null);
                  setOpen(false);
                }}
                className="text-sm"
              >
                {email}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedTeam === null ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
              <p className="p-2 text-sm text-gray-400">Команды</p>
              {data.data &&
                data.data.map((team: any) => (
                  <CommandItem
                    key={team.id}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {team.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam?.name === team.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
            <CommandSeparator />
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
