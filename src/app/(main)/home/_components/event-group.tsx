"use client";
import { Title } from "@/components/shared/title";
import React, { useState } from "react";
import { Event } from "./event";
import { type Event as EventType } from "@prisma/client";
import { cn } from "@/lib/utils";
import { MainEvent } from "./main-event";
import { Button } from "@/components/ui/button";

import { api } from "@/trpc/react";

interface Props {
  title: string;
  className?: string;
}

export const EventGroup: React.FC<Props> = ({ title, className }) => {
  const [activeId, setActiveId] = useState<string>("");
  const myQuery = api.event.getAllEvents.useInfiniteQuery(
    {
      limit: 8,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  if (myQuery.isLoading) return <div>Загрузка...</div>;
  return (
    <div
      id={title}
      className={cn(
        className,
        "mx-auto h-full w-full grow flex-col gap-4 md:flex md:flex-row",
      )}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4 md:items-baseline">
        <Title text={title} size="lg" className="text-3xl font-extrabold" />
        {activeId && (
          <MainEvent setActive={() => setActiveId("")} id={activeId} />
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myQuery.data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.items.map((item) => (
                <Event
                  setActive={() => setActiveId(item.id)}
                  key={item.id}
                  {...item}
                  className="rounded-lg bg-white shadow-md"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        {myQuery.hasNextPage && (
          <Button onClick={() => myQuery.fetchNextPage()}>Load more</Button>
        )}
      </div>
    </div>
  );
};
