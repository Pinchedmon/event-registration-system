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
import { ru } from "date-fns/locale";
import { api } from "@/trpc/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface Props {
  className?: string;
  id: string;
}

type Inputs = {
  name: string;
  theme: string;
};

export const TeamEdit: React.FC<Props> = ({ className, id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const data = api.team.getTeam.useQuery(id);
  const [date, setDate] = React.useState<Date>(data.data?.endDate as Date);

  const trpcClient = api.useUtils();
  const mutation = api.team.updateTeam.useMutation({
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
        description: "Вы обновили команду",
      });
      trpcClient.team.getAllTeams.refetch();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: data.data?.name,
      theme: data.data?.theme as string,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({
      id,
      ...data,
      endDate: date,
      deletedAt: null,
    });
  };
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

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
          <DialogTitle>Изменение команды</DialogTitle>
        </DialogHeader>

        <form
          className={cn(className, "flex w-full flex-col gap-4")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              Имя
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
            <Label htmlFor="theme" className="text-right">
              Тема
            </Label>
            <select
              defaultValue={data.data?.theme ?? ""}
              className={cn(
                "col-span-3 w-full rounded-[0.5rem] border bg-white px-4 py-2 text-sm text-black",
              )}
              id="role"
              {...register("theme", { required: true })}
            >
              <option value="Services">Услуги</option>
              <option value="Conf">Конференция</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              Тема
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd MMMM yyyy", { locale: ru })
                  ) : (
                    <span>Выбери дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  defaultMonth={new Date()} // Set default month to current month
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>
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
