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
import SortingButton from "../_components/sortingButton";

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
    id: "Name",
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Name" />,
  },
  {
    accessorKey: "documentPublished",
    id: "Published documents",
    header: ({ column }) => <SortingButton column={column} title="Published Documents" />,
  },
  {
    id: "Actions",
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const country = row.original

      return (
        <ActionMenu item={country} actions={actions}/>
      );
    },
  },
];
