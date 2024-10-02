"use client";
import { Title } from "@/components/shared/title";
import React, { useState } from "react";
import { Event } from "./event";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/shared/dataTable/Table";
import { Event as EventType } from "@/server/api/schema/event";
import { MainEvent } from "./main-event";

interface Props {
  className?: string;
}

export const UpcomingEvents: React.FC<Props> = ({ className }) => {
  const { data, isLoading } = api.event.getUpcomingEvents.useQuery();
  const [activeId, setActiveId] = useState<string>("");
  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div
      className={cn(
        className,
        "mx-auto mb-4 h-full w-full grow flex-col gap-4 md:flex md:flex-row",
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 md:items-baseline">
        <Title
          text="Ближайшие мероприятия"
          size="lg"
          className="text-3xl font-extrabold"
        />
        {activeId && (
          <MainEvent setActive={() => setActiveId("")} id={activeId} />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.map((item: EventType) => (
              <Event
                setActive={() => setActiveId(item.id as string)}
                key={item.id}
                {...item}
                className="rounded-lg bg-white shadow-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
};
