"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

import { DialogClose } from "@/components/ui/dialog";

import { useState } from "react";
import { type Event } from "@/server/api/schema/event";
import { toast } from "@/hooks/use-toast";

export function AddEventForm({ onClose }: { onClose: () => void }) {
  const trpcClient = api.useUtils();
  const form = useForm<Event>({
    defaultValues: {},
  });
  const [sizes, setSizes] = useState<Array<string>>([]);
  const [size, setSize] = useState<string>("");
  const mutation = api.event.createEvent.useMutation({
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
    onSuccess: async () => {
      toast({
        title: "✅ Успешно",
        description: "Вы добавили картинки",
      });
      await trpcClient.event.getAllEvents.refetch();
      onClose();
    },
  });

  const onSubmit: SubmitHandler<Event> = (values) => {
    // mutation.mutate({
    //   // name: values.name,
    //   // sizes: sizes,
    //   // image: values.image,
    // });
  };
  const deleteItem = (name: string) => {
    setSizes(sizes.filter((item: string) => item !== name));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <div>
          {sizes.length > 0 &&
            sizes.map((item: string, index: number) => (
              <div key={index} className="flex">
                <div className="mr-2"> {item}</div>
                <Button type="button" onClick={() => deleteItem(item)}>
                  X
                </Button>
              </div>
            ))}
        </div>
        <Input
          placeholder="размер"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            if (size !== "") {
              setSizes([...sizes, size]);
              setSize("");
            }
          }}
        >
          Добавить размер
        </Button>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>фото</FormLabel>
              <FormControl>
                <Input placeholder="ссылка" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" className="bg-orange">
            Отправить
          </Button>
          <DialogClose>
            <Button type="button" onClick={onClose} className="bg-black">
              Отмена
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}
