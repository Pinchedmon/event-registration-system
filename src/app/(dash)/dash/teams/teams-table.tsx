"use client";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Title } from "@/components/shared/title";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import { teamsColumns } from "./teams-columns";
import { AddTeam } from "./add-team";

interface Props {
  className?: string;
}

export const TeamsTable: React.FC<Props> = ({ className }) => {
  const { data } = api.team.getAllTeams.useQuery();

  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Команды"} className="mb-2" />
      <AddTeam className="mb-2" />
      {data && <DataTable columns={teamsColumns} data={data} />}
    </div>
  );
};
