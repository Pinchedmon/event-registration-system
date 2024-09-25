"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

enum Roles {
  // ADMIN = "Администратор",
  ORGANIZER = "Организатор",
  REGISTRATOR = "Регистратор",
  USER = "Пользователь",
}
type Inputs = {
  login: string;
  password: string;
  role: Roles;
};

export const SignUpForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const mutation = api.users.createUser.useMutation({
    onMutate: () => {
      toast({
        title: "🔄 Создание...",
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
        description: "Вы добавили картинки",
      });
      router.push("/login");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({
      email: data.login,
      password: data.password,
      role: Object.keys(Roles)[Object.values(Roles).indexOf(data.role)]! as
        | "USER"
        | "ORGANIZER"
        | "REGISTRATOR",
      firstName: null,
      lastName: null,
      patronymic: null,
      organization: null,
      phone: null,
      position: null,
      deletedAt: null,
      lastAuthorizedAt: null,
    });
  };

  return (
    <form
      className={cn(className, "flex flex-col gap-4")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-full">
        <input
          type="text"
          id="login"
          className="peer w-full rounded-md border border-gray-300 px-4 py-2 placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("login", { required: true })}
        />
        <label
          htmlFor="login"
          className={`bg-transparent" absolute -top-2 left-2 bg-white px-2 text-sm text-black transition-all peer-focus:-top-2 peer-focus:bg-white peer-focus:text-blue-500`}
        >
          Email
        </label>
        {errors.login && <span>Введите Email</span>}
      </div>
      <div className="relative w-full">
        <input
          type="text"
          id="password"
          className="peer w-full rounded-md border border-gray-300 px-4 py-2 placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", { required: true })}
        />
        <label
          htmlFor="password"
          className={`bg-transparent" absolute -top-2 left-2 bg-white px-2 text-sm text-black transition-all peer-focus:-top-2 peer-focus:bg-white peer-focus:text-blue-500`}
        >
          Пароль
        </label>
        {errors.password && <span>Введите пароль</span>}
      </div>
      <div className="relative w-full">
        <select
          className={cn(
            "m-0 w-full rounded-md border-r-8 border-transparent px-4 py-[11px] outline outline-1 outline-gray-300 focus:outline-[3px] focus:outline-blue-500 peer-focus:bg-white peer-focus:text-blue-500",
          )}
          id="role"
          {...register("role", { required: true })}
        >
          {Object.values(Roles).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <label
          htmlFor="password"
          className={`bg-transparent" absolute -top-2 left-2 bg-white px-3 text-sm text-black transition-all peer-focus:-top-2 peer-focus:bg-white peer-focus:text-blue-500`}
        >
          Роль
        </label>
        {errors.role && <span>Выберите роль</span>}
      </div>
      <Button className="bg-blue-500" type="submit">
        Войти
      </Button>
    </form>
  );
};
