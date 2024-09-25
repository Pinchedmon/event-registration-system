import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import moment from "moment";
import "moment/locale/ru";
import { Event as EventCard } from "@/server/api/schema/event";
import Link from "next/link";
import { FollowEventForm } from "./follow-event-form";

interface Props extends EventCard {
  className?: string;
  setActive: () => void;
}

export const Event: React.FC<Props> = ({
  id,
  className,
  name,
  description,
  startDate,
  endDate,
  address,
  image,
  registration,
  registrationEndDate,
  registrationStartDate,
  setActive,
}) => {
  let example =
    "qweuqwieoqwueipoqwueioqweuq ewquioeuqweioqwueiouwq ueoiqweuiqwoeuqwoeiq";
  return (
    <div
      className={cn(
        className,
        "relative flex h-screen max-h-[350px] max-w-[300px] flex-col rounded-xl bg-black/10 p-4 text-white",
        "md:max-h-[400px] md:max-w-[350px]",
        "lg:max-h-[450px] lg:max-w-[400px]",
      )}
    >
      <h3 className="z-10 mb-2 text-2xl font-bold">
        {name.length > 19 ? `${name.substring(0, 18)}...` : name}
      </h3>
      {description && (
        <p className="z-10 w-full text-sm">
          {description.length > 170
            ? `${description.substring(0, 107)}...`
            : description}
        </p>
      )}
      <div className="mt-auto"></div>
      {address && (
        <div className="z-10 mb-2 text-sm">
          <span className="mr-1 font-semibold">Адрес:</span>
          {address.length > 50 ? `${address.substring(0, 47)}...` : address}
        </div>
      )}

      <div className="z-10 mb-2 text-sm">
        <span className="mr-1 font-semibold">Дата:</span>
        {`${moment(startDate).locale("ru").format("ll")} - ${moment(endDate).locale("ru").format("ll")}`}
      </div>
      {registration && (
        <div className="z-10 mb-2 text-sm">
          <span className="mr-1 font-semibold text-white">
            Дата Регистрации:
          </span>
          {`${moment(registrationStartDate).locale("ru").format("lll")} - ${moment(registrationStartDate).locale("ru").format("lll")}`}
        </div>
      )}
      <div className="z-10 flex gap-2">
        {/* <Button className="z-10 border-white bg-blue-500 hover:border hover:bg-blue-500">
          Зарегистрироваться
        </Button> */}
        <FollowEventForm eventId={id as string} />
        <Link href="" className="md:w-full">
          <Button
            onClick={setActive}
            className="z-10 w-24 border-white md:w-full"
          >
            Подробнее
          </Button>
        </Link>
      </div>

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
