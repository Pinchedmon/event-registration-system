"use client";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Title } from "@/components/shared/title";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { api } from "@/trpc/react";
import { AddEvent } from "./add-event";
import { useSession } from "next-auth/react";
import { eventColumns } from "./event-columns";

interface Props {
  className?: string;
}

export const EventTable: React.FC<Props> = ({ className }) => {
  const session = useSession();
  const { data } = api.event.getAllEvents.useQuery();
  const trpcClient = api.useUtils();

  return (
    <div className={cn(className, "mt-4 h-full")}>
      <Title text={"Мероприятия"} className="mb-2" />
      {session.data && <AddEvent id={session.data?.user.id} />}
      {data && <DataTable columns={eventColumns} data={data} />}
    </div>
  );
};
