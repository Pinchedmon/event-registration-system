"use client";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Title } from "@/components/shared/title";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { api } from "@/trpc/react";

import { useSession } from "next-auth/react";

import useTeamStore from "@/lib/teamStore";
import { AddEvent } from "../events/add-event";
import { eventColumns } from "../events/event-columns";

interface Props {
  className?: string;
}

export const EventTable: React.FC<Props> = ({ className }) => {
  const session = useSession();
  const { data } = api.event.getAllEventbyAdmin.useQuery();
  console.log(data);
  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Мероприятия"} className="mb-2" />
      {session.data && <AddEvent id={session.data?.user.id} />}
      {data && <DataTable columns={eventColumns} data={data} />}
    </div>
  );
};
