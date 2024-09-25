import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../../../../lib/utils";
import { api } from "@/trpc/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/server/api/schema/event";
import InputTime from "@/components/shared/input-time";

interface Props {
  className?: string;
  id: string;
}

export const AddEvent: React.FC<Props> = ({ className, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [registrationStartDate, setRegistrationStartDate] =
    React.useState<Date>(new Date());
  const [registrationEndDate, setRegistrationEndDate] = React.useState<Date>(
    new Date(),
  );

  const trpcClient = api.useUtils();
  const mutation = api.event.createEvent.useMutation({
    onMutate: () => {
      toast({
        title: "Создание...",
      });
    },

    onError: (e: any) => {
      toast({
        title: "Ошбика",
        description: e.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Вы добавили мероприятие",
      });
      trpcClient.event.getAllEvents.refetch();
      setIsOpen(false);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Event>();
  const onSubmit: SubmitHandler<Event> = (data) => {
    mutation.mutate({
      ...data,
      userId: id, // assuming you have a currentUser object with an id field
      startDate,
      endDate,
      registrationStartDate,
      registrationEndDate,
      deletedAt: null,
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <div
          onClick={() => setIsOpen(true)}
          className="mb-2 flex items-center gap-2 rounded-xl border bg-background bg-blue-500 px-4 py-2 text-sm text-white"
        >
          Создать
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать мероприятие</DialogTitle>
          <DialogDescription>
            В командах может быть много работников отвечающих за ваши
            мероприятия
          </DialogDescription>
        </DialogHeader>

        <form
          className={cn(className, "flex w-full flex-col gap-4")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Название
            </Label>
            <Input
              id="name"
              className={cn(
                errors.name ? "border-red-500 placeholder:text-red-500" : "",
                "col-span-3",
              )}
              placeholder={errors.name ? "Обязательно" : "Название"}
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Описание
            </Label>
            <Input
              id="description"
              className={cn(
                errors.description
                  ? "border-red-500 placeholder:text-red-500"
                  : "",
                "col-span-3",
              )}
              placeholder={errors.description ? "Обязательно" : "Описание"}
              {...register("description")}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <InputTime
                onDateChange={(date) => setStartDate(date)}
                onTimeChange={(time) => {
                  if (startDate) {
                    const [hours, minutes] = time
                      .split(":")
                      .map((str) => parseInt(str, 10));
                    const newDate = new Date(startDate);
                    newDate.setHours(hours as number);
                    newDate.setMinutes(minutes as number);
                    setStartDate(newDate);
                  }
                }}
                value={startDate}
                label={"Дата начала"}
              />
            </div>
            <div className="w-full">
              <InputTime
                onDateChange={(date) => setEndDate(date)}
                onTimeChange={(time) => {
                  if (endDate) {
                    const [hours, minutes] = time
                      .split(":")
                      .map((str) => parseInt(str, 10));
                    const newDate = new Date(endDate);
                    newDate.setHours(hours as number);
                    newDate.setMinutes(minutes as number);
                    setEndDate(newDate);
                  }
                }}
                value={endDate}
                label={"Дата конца"}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Адрес
            </Label>
            <Input
              id="address"
              className={cn(
                errors.address ? "border-red-500 placeholder:text-red-500" : "",
                "col-span-3",
              )}
              placeholder={errors.address ? "Обязательно" : "Адрес"}
              {...register("address", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Изображение
            </Label>
            <Input
              id="image"
              className={cn(
                errors.image ? "border-red-500 placeholder:text-red-500" : "",
                "col-span-3",
              )}
              placeholder={errors.image ? "Обязательно" : "Ссылка"}
              {...register("image")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="registration" className="text-right">
              Регистрация
            </Label>
            <Input
              id="registration"
              type="checkbox"
              {...register("registration")}
            />
          </div>
          {watch("registration") && (
            <div className="flex gap-2">
              <div className="w-full">
                <InputTime
                  label={"Дата начала регистрации"}
                  onDateChange={(date) => setRegistrationStartDate(date)}
                  onTimeChange={(time) => {
                    if (registrationStartDate) {
                      const [hours, minutes] = time
                        .split(":")
                        .map((str) => parseInt(str, 10));
                      const newDate = new Date(registrationStartDate);
                      newDate.setHours(hours as number);
                      newDate.setMinutes(minutes as number);
                      setRegistrationStartDate(newDate);
                    }
                  }}
                  value={registrationStartDate}
                />
              </div>
              <div className="w-full">
                <InputTime
                  onDateChange={(date) => setRegistrationEndDate(date)}
                  onTimeChange={(time) => {
                    if (registrationEndDate) {
                      const [hours, minutes] = time
                        .split(":")
                        .map((str) => parseInt(str, 10));
                      const newDate = new Date(registrationEndDate);
                      newDate.setHours(hours as number);
                      newDate.setMinutes(minutes as number);
                      setRegistrationEndDate(newDate);
                    }
                  }}
                  value={registrationEndDate}
                  label={"Дата окончания рег."}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              type="button"
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-blue-500">
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
