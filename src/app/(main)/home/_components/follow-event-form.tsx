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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import InputMask from "react-input-mask";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface Inputs {
  firstName: string;
  lastName: string;
  patronymic: string;
  organization: string;
  phone: string;
  position: string;
  email: string;
}

export function FollowEventForm(props: { eventId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const session = useSession();
  const { data } = api.users.getUser.useQuery(session.data?.user.id as string);
  const [isOpen, setIsOpen] = useState(false);
  const mutation = api.participant.createParticipant.useMutation({
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
        description: "Вы зарегистрировались на мероприятие",
      });
      setIsOpen(false);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      organization: data.organization,
      phone: data.phone,
      position: data.position,
      email: data.email,
    };

    const partInput = {
      eventId: props.eventId,
      userId: session.data?.user.id as string,
      deletedAt: null,
    };

    mutation.mutate({
      user: userInput,
      part: partInput,
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <p className="relative flex cursor-default select-none items-center rounded-sm bg-blue-500 px-2 py-1.5 text-sm text-white outline-none transition-colors hover:border hover:bg-accent hover:bg-blue-500 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Зарегистрироваться
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Регистрация на мероприятие</DialogTitle>
          <DialogDescription>
            Введите свои данные для регистрации
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Имя
              </Label>
              <Input
                id="firstName"
                className={cn(
                  errors.firstName
                    ? "border-red-500 placeholder:text-red-500"
                    : "",
                  "col-span-3",
                )}
                defaultValue={data?.firstName ?? ""}
                placeholder={errors.firstName ? "Обязательно" : "Иван"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Фамилия
              </Label>
              <Input
                id="lastName"
                placeholder={errors.lastName ? "Обязательно" : "Иванов"}
                className={cn(
                  errors.lastName
                    ? "border-red-500 placeholder:text-red-500"
                    : "",
                  "col-span-3",
                )}
                defaultValue={data?.lastName ?? ""}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patronymic" className="text-right">
                Отчество
              </Label>
              <Input
                id="patronymic"
                placeholder="Иванович"
                defaultValue={data?.patronymic ?? ""}
                className="col-span-3"
                {...register("patronymic")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Телефон
              </Label>
              <InputMask
                mask="+7 (999) 999-99-99"
                defaultValue={data?.phone ?? ""}
                {...register("phone")}
                className="col-span-3 w-full rounded-[0.5rem] border bg-white px-4 py-2 text-sm text-black"
                placeholder="номер"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organization" className="text-right">
                Организация
              </Label>
              <Input
                id="organization"
                placeholder="название"
                className="col-span-3"
                defaultValue={data?.organization ?? ""}
                {...register("organization")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Должность
              </Label>
              <Input
                id="position"
                placeholder="студент"
                className="col-span-3"
                defaultValue={data?.position ?? ""}
                {...register("position")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="почта"
                className={cn(
                  errors.email ? "border-red-500 placeholder:text-red-500" : "",
                  "col-span-3",
                )}
                defaultValue={data?.email}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-2">
              <Button type="submit" className="bg-blue-500">
                Зарегистрироваться
              </Button>
              <Button
                type="button"
                className=""
                onClick={() => setIsOpen(false)}
              >
                Отмена
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
