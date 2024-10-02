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
import { Input } from "@/components/ui/input";
import { cn } from "../../../../lib/utils";
import { api } from "@/trpc/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import InputTime from "@/components/shared/input-time";
import { Event } from "@/server/api/schema/event";

interface Props {
  className?: string;
  id: string;
}

export const EventEdit: React.FC<Props> = ({ className, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const data = api.event.getEvent.useQuery(id);
  const [startDate, setStartDate] = React.useState<Date>(
    data.data?.startDate as Date,
  );
  const [endDate, setEndDate] = React.useState<Date>(
    data.data?.endDate as Date,
  );
  const [registrationStartDate, setRegistrationStartDate] =
    React.useState<Date>(data.data?.registrationStartDate as Date);
  const [registrationEndDate, setRegistrationEndDate] = React.useState<Date>(
    data.data?.registrationEndDate as Date,
  );
  const { data: teams } = api.team.getAllTeams.useQuery();
  const trpcClient = api.useUtils();
  const mutation = api.event.updateEvent.useMutation({
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
        description: "Вы обновили мероприятие",
      });
      trpcClient.event.getAllEvents.refetch();
      setIsOpen(false);
    },
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({
    defaultValues: {
      name: data.data?.name,
      description: data.data?.description as string,
      address: data.data?.address,
      image: data.data?.image as string,
      registration: data.data?.registration,
    },
  });
  const onSubmit: SubmitHandler<Event> = (data) => {
    const eventData = {
      id: id,
      ...data,
      startDate,
      endDate,
      registrationStartDate,
      registrationEndDate,
      deletedAt: null,
      userId: null,
    };
    mutation.mutate(eventData);
  };
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setStartDate(newDate);
    }
  };
  const handleEndDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setEndDate(newDate);
    }
  };
  const handleRegistrationStartDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setRegistrationStartDate(newDate);
    }
  };
  const handleRegistrationEndDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setRegistrationEndDate(newDate);
    }
  };

  React.useEffect(() => {
    if (data.data) {
      setStartDate(data.data.startDate as Date);
      setEndDate(data.data.endDate as Date);
      setRegistrationStartDate(data.data.registrationStartDate as Date);
      setRegistrationEndDate(data.data.registrationEndDate as Date);
    }
  }, [data.data]);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <p
          onClick={() => setIsOpen(true)}
          className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Редактировать
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение мероприятия</DialogTitle>
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
              defaultValue={data.data?.name}
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
              defaultValue={data.data?.description ?? ""}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamId" className="text-right">
              Команда
            </Label>
            <select
              id="teamId"
              defaultValue={data.data?.teamId as string}
              className={cn(
                errors.teamId ? "border-red-500 placeholder:text-red-500" : "",
                "col-span-3",
              )}
              {...register("teamId", { required: true })}
            >
              <option value="">Выберите команду</option>
              {teams?.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <InputTime
                label={"Дата начала"}
                onDateChange={(date) => handleDateChange(date)}
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
              />
            </div>
            <div className="w-full">
              <InputTime
                label={"Дата конца"}
                onDateChange={(date) => handleEndDateChange(date)}
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
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Адрес
            </Label>
            <Input
              id="address"
              defaultValue={data.data?.address}
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
              defaultValue={data.data?.image ?? ""}
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
                  onDateChange={(date) =>
                    handleRegistrationStartDateChange(date)
                  }
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
                  label={"Дата окончания рег."}
                  onDateChange={(date) => handleRegistrationEndDateChange(date)}
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
              Обновить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
