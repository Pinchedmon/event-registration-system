import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import moment from "moment";
import { EventCard } from "@/server/api/schema/event";
interface Props extends EventCard {
  className?: string;
}

export const Event: React.FC<Props> = ({
  className,
  name,
  description,
  startDate,
  endDate,
  address,
  image,
}) => {
  return (
    <div
      className={cn(
        className,
        "relative flex h-screen max-h-[350px] max-w-[300px] flex-col rounded-xl bg-black/10 p-4 text-white",
      )}
    >
      <h3 className="z-10 mb-2 text-2xl font-bold">{name}</h3>
      {description && <p className="z-10 w-full text-sm">{description}</p>}
      <div className="mt-auto"></div>
      {address && (
        <div className="z-10 mb-2 text-sm">
          <span className="mr-1 font-semibold">Адрес:</span>
          {address}
        </div>
      )}
      <div className="z-10 mb-2 text-sm">
        <span className="mr-1 font-semibold">Дата:</span>
        {`${moment(startDate).subtract(10, "days").calendar()} - ${moment(endDate).subtract(10, "days").calendar()}`}
      </div>

      <Button className="z-10 border-white bg-blue-500 hover:border hover:bg-blue-500">
        Зарегистрироваться
      </Button>
      {image && (
        <Image
          src={image}
          alt=""
          className="absolute left-0 top-0 z-0 h-full rounded-xl brightness-50"
          width={400}
          height={400}
        />
      )}
    </div>
  );
};
