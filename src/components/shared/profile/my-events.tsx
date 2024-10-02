import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Participant } from "@/server/api/schema/participant";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
enum Status {
  PENDING = "Ожидает подтверждения",
  REJECTED = "Отклонено",
  APPROVED = "Подтверждено",
}

export function MyEvents(props: { id: string }) {
  const router = useRouter();
  const [isOpenQRCode, setIsOpenQRCode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const trpcClient = api.useUtils();
  const { data } = api.participant.getParticipantsByUser.useQuery(props.id);
  const mutation = api.participant.deleteParticipant.useMutation({
    onMutate: () => {
      toast({
        title: "🔄 Создание...",
      });
    },

    onError: (e: any) => {
      toast({
        title: "🚫 Ошибка",
        description: e.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "✅ Успешно",
        description: "Вы добавили картинки",
      });

      trpcClient.participant.getParticipantsByUser.refetch();
    },
  });
  const removePart = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Мои мероприятия
        </p>
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col overflow-y-auto sm:max-w-md md:!h-auto md:max-h-screen">
        <DialogHeader>
          <DialogTitle>Мои мероприятия</DialogTitle>
          <DialogDescription>
            Список мероприятий, в которых вы участвуете
          </DialogDescription>
        </DialogHeader>
        {data?.length == 0 && "Вы не записались ещё ни на одно мероприятие"}
        {data && (
          <div className="grid gap-4 overflow-y-auto py-4 md:grid-cols-2">
            {data.map((part: Participant | any) => (
              <div
                key={part.event.id}
                className="flex flex-col gap-4 rounded border p-4"
              >
                <div className="flex gap-2">
                  <p className="text-sm font-bold">{part.event.name}</p>
                  <Image
                    className="ml-auto rounded"
                    src={part.event.image}
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
                <p className="mt-auto text-sm">
                  Статус: {Status[part.status as keyof typeof Status]}
                </p>
                {part.status == "PENDING" && (
                  <Button
                    onClick={() => removePart(part.id)}
                    className="bg-blue-500"
                  >
                    Отменить
                  </Button>
                )}
                {part.status == "APPROVED" && (
                  <div className="flex items-center justify-center">
                    <Button
                      className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      onClick={() => {
                        setIsOpenQRCode(true);
                      }}
                    >
                      Показать QR код
                    </Button>
                    {isOpenQRCode && (
                      <div
                        className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white"
                        onClick={() => {
                          setIsOpenQRCode(false);
                        }}
                      >
                        <QRCodeSVG
                          value={
                            globalThis.location.origin +
                            "/qr?userID=" +
                            props.id +
                            "&eventID=" +
                            part.eventId
                          }
                          title={"Title for my QR Code"}
                          size={300} // adjust the size as needed
                          bgColor={"#ffffff"}
                          fgColor={"#000000"}
                          level={"L"}
                          marginSize={0}
                        />
                      </div>
                    )}
                  </div>
                )}
                {part.status == "REJECTED" && (
                  <Button
                    onClick={() => removePart(part.id)}
                    className="bg-red-500"
                  >
                    Удалить
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button type="button" className="" onClick={() => setIsOpen(false)}>
              Выйти
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
