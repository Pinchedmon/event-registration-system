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
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

import { api } from "@/trpc/react";

import { type User } from "@/server/api/schema/users";
import { usersColumns } from "./users-columns";

interface Props {
  className?: string;
}

export const UsersTable: React.FC<Props> = ({ className }) => {
  const { data } = api.users.getAllUsers.useQuery();
  // const [detail, setDetail] = useState<User>();
  const trpcClient = api.useUtils();

  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Пользователи"} className="mb-2" />
      {data && <DataTable columns={usersColumns} data={data} />}
    </div>
  );
};
