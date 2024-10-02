"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ru";
import { api } from "@/trpc/react";
import { FollowEventForm } from "./follow-event-form";

interface Props {
  className?: string;
  setActive: () => void;
  id: string;
}

export const MainEvent: React.FC<Props> = ({ className, setActive, id }) => {
  const { data } = api.event.getEvent.useQuery(id);
  return (
    <>
      {data && (
        <div
          className={cn(
            className,
            "justify-left relative mr-auto flex w-full flex-col rounded-xl bg-blue-500/10 md:max-h-[350px] md:flex-row",
          )}
        >
          <div className="p-4 pb-0 md:pb-4">
            {data.image && (
              <Image
                src={data.image}
                alt=""
                className="aspect-square h-full max-h-[300px] max-w-[300px] rounded-xl"
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="flex flex-col p-4 md:py-4">
            <h3 className="z-10 mb-2 text-3xl font-bold">{data.name}</h3>
            {data && data.description && (
              <p className="z-10 w-full text-sm">{data.description}</p>
            )}
            <div className="mt-auto"></div>
            {data.address && (
              <div className="z-10 mb-2 text-sm">
                <span className="mr-1 font-semibold">Адрес:</span>
                {data.address.length > 50
                  ? `${data.address.substring(0, 47)}...`
                  : data.address}
              </div>
            )}

            <div className="z-10 mb-2 text-sm">
              <span className="mr-1 font-semibold">Дата:</span>
              {`${moment(data.startDate).locale("ru").format("ll")} - ${moment(data.endDate).locale("ru").format("ll")}`}
            </div>
            {data.registration && (
              <div className="z-10 mb-2 text-sm">
                <span className="mr-1 font-semibold">Дата Регистрации:</span>
                {`${moment(data.registrationStartDate).locale("ru").format("lll")} - ${moment(data.registrationStartDate).locale("ru").format("lll")}`}
              </div>
            )}
            <div className="z-10 flex w-full gap-2">
              <FollowEventForm eventId={id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
