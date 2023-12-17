"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Filter, ArrowUpDown } from "lucide-react";

import { ActionMenu } from "../_components/action-menu";
import { Button } from "@/components/ui/button";
import SortingButton from "../_components/sortingButton";


export type AuthorTable = {
  name: string;
};

const actions = [
  {
    label: "اطلاعات بیشتر",
    icon: <Eye />,
    onClick: (author: AuthorTable) => console.log("action done"),
  },
  {
    label: "اضافه کردن به فیلتر",
    icon: <Filter />,
    onClick: (author: AuthorTable) => console.log("action done"),
  },
];

export const columns: ColumnDef<AuthorTable>[] = [
  {
    accessorKey: "name",
    id: "Full Name",
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Full Name" />,
  },
  {
    id: "Actions",
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const author = row.original;
      return (
        <ActionMenu item={author} actions={actions}/>
      );
    },
  },
];
