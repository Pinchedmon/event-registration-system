"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [selected, setSelected] = useState<string>("Фильтр");
  return (
    <div className="flex items-end gap-2">
      <div className="flex items-end gap-2">
        <div className="flex flex-col">
          <p className="text-sm">Поиск</p>
          <Input
            id="filter-input"
            placeholder="номер"
            value={
              (table.getColumn(selected)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(selected)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              {selected}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuRadioGroup
              value={selected}
              onValueChange={setSelected}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuRadioItem
                      key={column.id}
                      className="capitalize"
                      value={column.id}
                    >
                      {column.id}
                    </DropdownMenuRadioItem>
                  );
                })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto" asChild>
          <Button variant="outline" className="">
            Колонки
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
