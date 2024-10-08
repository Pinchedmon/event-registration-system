import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { api } from "@/trpc/react";

import React, { useState } from "react";

import { toast } from "@/hooks/use-toast";

export function TeamRemove(props: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const trpcClient = api.useUtils();
  const mutation = api.team.deleteTeam.useMutation({
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
      setIsOpen(false);
      trpcClient.team.getAllTeams.refetch();
    },
  });
  const removeTeam = () => {
    mutation.mutate(props.id);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Удалить
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
          <DialogDescription>
            Вы точно уверены, что хотите удалить эту группу?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Button onClick={removeTeam} className="bg-blue-500">
            Да
          </Button>
          <Button onClick={() => setIsOpen(false)}>Нет</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
