"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Eye, Filter, MoreHorizontal } from "lucide-react";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";
import { ReactElement, cloneElement } from "react";
import { ActionMenu } from "../_components/action-menu";

export type CountryTable = {
  name: string;
  documentPublished: number;
};

const actions = [
  {
    label: "اطلاعات بیشتر",
    icon: <Eye />,
    onClick: (country: CountryTable) => console.log("action done"),
  },
  {
    label: "اضافه کردن به فیلتر",
    icon: <Filter />,
    onClick: (country: CountryTable) => console.log("action done"),
  },
];

export const columns: ColumnDef<CountryTable>[] = [
  {
    accessorKey: "name",
    header: "title",
  },
  {
    accessorKey: "documentPublished",
    header: "number of publication",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const country = row.original

      return (
        <ActionMenu item={country} actions={actions}/>
      );
    },
  },
];
