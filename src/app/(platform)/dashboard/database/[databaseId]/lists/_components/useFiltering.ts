"use client"

import { useState, Dispatch, SetStateAction } from "react";
import { BaseItem } from "./action-menu";
import { ColumnFiltersState } from "@tanstack/react-table";

export function useFiltering<DataT extends BaseItem>(initialField: keyof DataT = "id" , initialFilter: string = ""): {
  filtering: ColumnFiltersState;
  value: unknown;
  onFilteringChange: Dispatch<SetStateAction<ColumnFiltersState>>;
  field: keyof DataT;
} {
  const [filtering, setFiltering] = useState<ColumnFiltersState>([
    { id: initialField as string , value: initialFilter},
  ]);

  return {
    filtering,
    onFilteringChange: setFiltering,
    value: !filtering.length ? initialFilter : filtering[0].value,
    field: filtering.length ? (filtering[0].id as keyof DataT) : initialField,
  };
}
