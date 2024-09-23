"use client";

import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  additionalFilters?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  additionalFilters,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;
  return (
    <div className="w-full">
      {/* {additionalFilters && additionalFilters} */}

      <DataTableViewOptions table={table} />
    </div>
  );
}
