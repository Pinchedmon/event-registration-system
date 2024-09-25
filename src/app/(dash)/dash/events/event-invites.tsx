import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "../../../../lib/utils";
import { api } from "@/trpc/react";
import { toast } from "@/hooks/use-toast";

interface Props {
  className?: string;
  eventId: string;
}

export const EventInvites: React.FC<Props> = ({ className, eventId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data } = api.participant.getParticipantsByEventId.useQuery(eventId);

  const trpcClient = api.useUtils();
  const mutation = api.participant.updateParticipant.useMutation({
    onMutate: () => {
      toast({
        title: "🔄 Обновление...",
      });
    },

    onError: (e: any) => {
      toast({
        title: "🚫 Ошбика",
        description: e.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "✅ Успешно",
        description: "Вы обновили статус заявки",
      });
      trpcClient.participant.getParticipantsByEventId.refetch(eventId);
      setIsOpen(false);
    },
  });

  const handleUpdateParticipant = (
    id: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) => {
    mutation.mutate({
      id,
      status,
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <p
          onClick={() => setIsOpen(true)}
          className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Управление заявками
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Управление заявками</DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            className,
            "flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto",
          )}
        >
          {data?.length == 0 && <p>нет приглашений</p>}
          {data?.map((part) => (
            <div key={part.id} className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                {part.user.firstName} {part.user.lastName}
              </Label>
              <div className="col-span-3 flex gap-2">
                <Button
                  onClick={() => handleUpdateParticipant(part.id, "APPROVED")}
                  className="bg-green-500"
                >
                  Принять
                </Button>
                <Button
                  onClick={() => handleUpdateParticipant(part.id, "REJECTED")}
                  className="bg-red-500"
                >
                  Отклонить
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} type="button">
            Выйти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
