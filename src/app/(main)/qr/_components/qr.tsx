"use client";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

export const QR: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userID") as string;
  const eventId = searchParams.get("eventID") as string;
  const { data } = api.participant.getParticipantStatus.useQuery({
    userId,
    eventId,
  });
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="max-w-md rounded bg-white p-4 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Статус участника</h2>
        <div className="mb-4 flex justify-center">
          {!data && (
            <span className="rounded bg-yellow-200 px-4 py-2 text-sm text-yellow-600">
              Загрузка
            </span>
          )}
          {data === "PENDING" ? (
            <span className="rounded bg-yellow-200 px-4 py-2 text-sm text-yellow-600">
              ожидается
            </span>
          ) : data === "APPROVED" ? (
            <span className="rounded bg-green-200 px-4 py-2 text-sm text-green-600">
              принято
            </span>
          ) : (
            data === "REJECTED" && (
              <span className="rounded bg-red-200 px-4 py-2 text-sm text-red-600">
                отклонено
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
