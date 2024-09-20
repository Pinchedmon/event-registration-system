"use client";
import { Title } from "@/components/shared/title";
import React from "react";
import { Event } from "./event";
import { type Event as EventType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  items: EventType[];
  className?: string;
}

export const EventGroup: React.FC<Props> = ({ title, items, className }) => {
  // const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  // const intersectionRef = React.useRef(null);
  // const intersection = useIntersection(intersectionRef, {
  //   threshold: 0.4,
  // });

  // React.useEffect(() => {
  //   if (intersection?.isIntersecting) {
  //     setActiveCategoryId(categoryId);
  //   }
  // }, [intersection?.isIntersecting]);

  return (
    <div
      id={title}
      className={cn(
        className,
        "mx-auto h-full w-full grow flex-col gap-4 md:flex md:flex-row",
      )}
    >
      <div className="flex flex-col gap-4">
        <Title text={title} size="lg" className="mb-5 font-extrabold" />
        <div className="flex gap-4">
          {items.map((item, i) => (
            <Event
              key={i}
              id={item.id}
              name={item.name}
              description={item.description ?? ""}
              startDate={item.startDate}
              endDate={item.endDate}
              address={item.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <Event
            key={i}
            id={item.id}
            name={item.name}
            description={item.description ?? ""}
            startDate={item.startDate}
            endDate={item.endDate}
            address={item.address}
          />
        ))}
      </div> */
}
