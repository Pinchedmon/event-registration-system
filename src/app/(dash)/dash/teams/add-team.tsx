import * as React from "react";

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
import { ru } from "date-fns/locale";
import { api } from "@/trpc/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Select } from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/date-time-picket";
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
}

type Inputs = {
  name: string;
  theme: string;
};

export const AddTeam: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());

  const trpcClient = api.useUtils();
  const mutation = api.team.createTeam.useMutation({
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
      trpcClient.team.getAllTeams.refetch();
      setIsOpen(false);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({
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
  console.log(date);
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
          <DialogTitle>Создать команду</DialogTitle>
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
            <Label htmlFor="firstName" className="text-right">
              Имя
            </Label>
            <Input
              id="name"
              className={cn(
                errors.name ? "border-red-500 placeholder:text-red-500" : "",
                "col-span-3",
              )}
              placeholder={errors.name ? "Обязательно" : "Название"}
              // defaultValue={data.data?.firstName ?? ""}
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">
              Тема
            </Label>
            <select
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
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
