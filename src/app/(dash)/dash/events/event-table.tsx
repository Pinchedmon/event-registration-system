"use client";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Title } from "@/components/shared/title";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import { AddEvent } from "./add-event";
import { useSession } from "next-auth/react";
import { eventColumns } from "./event-columns";
import useTeamStore from "@/lib/teamStore";

interface Props {
  className?: string;
}

export const EventTable: React.FC<Props> = ({ className }) => {
  const { selectedTeamId } = useTeamStore((state) => state);
  const session = useSession();
  const { data } = api.event.getAllEventbyTeam.useQuery(
    selectedTeamId as string,
  );

  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Мероприятия"} className="mb-2" />
      {session.data && <AddEvent id={session.data?.user.id} />}
      {data && <DataTable columns={eventColumns} data={data} />}
    </div>
  );
};
