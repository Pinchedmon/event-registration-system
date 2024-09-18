"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
}

enum Roles {
  ADMIN = "Администратор",
  ORGANIZER = "Организатор",
  REGISTRATOR = "Регистратор",
  USER = "Пользователь",
}
type Inputs = {
  login: string;
  password: string;
  role: Roles;
};

export const LoginForm: React.FC<Props> = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
          Логин
        </label>
        {errors.login && <span>Введите пароль</span>}
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
            "peer w-full rounded-md border-l-[16px] border-r-8 border-transparent px-4 py-[11px] pl-10 outline outline-1 outline-gray-300 focus:outline-[3px] focus:outline-blue-500 peer-focus:bg-white peer-focus:text-blue-500",
            className,
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
      <div className="text-center">
        <p className="mb-0 text-center">Ещё не зарегистрированы?</p>
        <Link className="underline" href="#">
          Регистрация
        </Link>
        <p className="mt-4">Забыли пароль?</p>
        <Link className="underline" href="#">
          Восстановить
        </Link>
      </div>
    </form>
  );
};
