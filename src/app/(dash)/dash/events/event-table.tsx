"use client";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Title } from "@/components/shared/title";
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
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { AddEvent } from "./add-event-button";
import { api } from "@/trpc/react";
import { type Event } from "@/server/api/schema/event";

interface Props {
  className?: string;
}

export const EventTable: React.FC<Props> = ({ className }) => {
  const { data } = api.event.getAllEvents.useQuery();
  const [detail, setDetail] = useState<Event>();
  const trpcClient = api.useUtils();
  console.log(data);
  const columns: ColumnDef<Event>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Имя
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "name",
    },

    {
      id: "actions",
      cell: ({ row }: any) => {
        const detail = row.original;
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
                <DropdownMenuItem onClick={() => 1}>
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => 1}>Удалить</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Мероприятия"} className="mb-2" />
      <AddEvent />
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};
