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
import { type SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Inputs {
  firstName: string;
  lastName: string;
  patronymic: string;
  organization: string;
  phone: string;
  position: string;
  role: "USER" | "ADMIN" | "ORGANIZER" | "REGISTRATOR";
  email: string;
}
enum Roles {
  ADMIN = "Администратор",
  ORGANIZER = "Организатор",
  REGISTRATOR = "Регистратор",
  USER = "Пользователь",
}
const russianPhoneNumber = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
export function UserEdit(props: { id: string }) {
  const trpcClient = api.useUtils();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isOpen, setIsOpen] = useState(false);
  const mutation = api.users.updateUserByAdmin.useMutation({
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
      trpcClient.users.getAllUsers.refetch();
    },
  });
  const data = api.users.getUser.useQuery(props.id);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutation.mutate({ id: props.id, ...data, updatedAt: new Date() });
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Редактровать
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
          <DialogDescription>Настройка пользователя</DialogDescription>
        </DialogHeader>
        {data.data && (
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
                  placeholder={errors.firstName ? "Обязательно" : "Иван"}
                  defaultValue={data.data?.firstName ?? ""}
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
                  defaultValue={data.data?.lastName ?? ""}
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
                  className="col-span-3"
                  defaultValue={data.data?.patronymic ?? ""}
                  {...register("patronymic")}
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
                  defaultValue={data.data?.organization ?? ""}
                  {...register("organization")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Телефон
                </Label>
                {/* <Input
                  id="phone"
                  className="col-span-3"
                  defaultValue={data.data?.phone ?? ""}
                /> */}
                <InputMask
                  mask="+7 (999) 999-99-99"
                  {...register("phone")}
                  className="col-span-3 w-full rounded-[0.5rem] border bg-white px-4 py-2 text-sm text-black"
                  placeholder="номер"
                  // inputClassName="text-black text-base leading-none placeholder:text-gray-400"
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
                  defaultValue={data.data?.position ?? ""}
                  {...register("position")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Роль
                </Label>
                <select
                  defaultValue={data.data?.role}
                  className={cn(
                    "col-span-3 w-full rounded-[0.5rem] border bg-white px-4 py-2 text-sm text-black",
                  )}
                  id="role"
                  {...register("role", { required: true })}
                >
                  {Object.entries(Roles).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="почта"
                  className={cn(
                    errors.email
                      ? "border-red-500 placeholder:text-red-500"
                      : "",
                    "col-span-3",
                  )}
                  defaultValue={data.data?.email}
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
                  Сохранить изменения
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
        )}
      </DialogContent>
    </Dialog>
  );
}
