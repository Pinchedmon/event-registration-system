"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../../../../lib/utils";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  // role: Roles;
};

export const LoginForm: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [result, setResult] = useState<{ ok: boolean } | null>(null);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await signIn("credentials", {
      redirect: false,
      login: data.login,
      password: data.password,
      // role: Object.keys(Roles)[Object.values(Roles).indexOf(data.role)]! as
      //   | "USER"
      //   | "ADMIN"
      //   | "ORGANIZER"
      //   | "REGISTRATOR",
    });

    req?.ok && router.push("/home");
    setResult(req!);
  };
  useEffect(() => {
    if (result?.ok === false) {
      setTimeout(() => setResult(null), 1000);
    }
  }, [result]);
  return (
    <form
      className={cn(className, "flex flex-col gap-4")}
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.login && <span className="text-red-500">Введите логин</span>}
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
      </div>
      {errors.password && <span className="text-red-500">Введите пароль</span>}
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
      </div>
      {/* <div className="relative w-full">
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
      </div> */}
      <Button
        className={
          result?.ok
            ? "bg-green-500"
            : result === null
              ? "bg-blue-500"
              : "bg-red-500"
        }
        type="submit"
      >
        {result?.ok ? "Входим..." : result === null ? "Войти" : "Ошибка входа"}
      </Button>
    </form>
  );
};
