"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { AddEventForm } from "./add-event-form";

export function AddEvent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <div
          onClick={() => setOpen(true)}
          className="mb-2 flex items-center gap-2 rounded-xl border bg-background bg-blue-500 p-2 text-sm text-white"
        >
          Создать
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление детали</DialogTitle>
        </DialogHeader>

        <AddEventForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
