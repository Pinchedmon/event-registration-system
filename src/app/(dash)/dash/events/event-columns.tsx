import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/server/api/schema/event";
import { Team } from "@/server/api/schema/team";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { EventRemove } from "./event-remove";
import moment from "moment";
import "moment/locale/ru";
import { EventEdit } from "./event-edit";
import { EventInvites } from "./event-invites";

export const eventColumns: ColumnDef<Event>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Описание
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "description",
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const event = row.original;

      return (
        <div>
          {moment(event.startDate).locale("ru").format("lll")} -
          {moment(event.endDate).locale("ru").format("lll")}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Адрес
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "address",
  },

  {
    id: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата регистрации
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const event = row.original;

      return (
        <div>
          {event.registration ? (
            <>
              {moment(event.registrationStartDate).locale("ru").format("lll")} -
              {moment(event.registrationEndDate).locale("ru").format("lll")}
            </>
          ) : (
            "без регистрации"
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const event = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={`shadow-md`}>
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                <EventEdit id={event.id} />
                <EventInvites eventId={event.id} />
                <EventRemove id={event.id} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
