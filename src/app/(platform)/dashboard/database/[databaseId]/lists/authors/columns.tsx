"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Eye, Filter } from "lucide-react";
import { ActionMenu } from "../_components/action-menu";
import { Author } from "../types";


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
    header: "Full Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const author = row.original;

      return (
        <ActionMenu item={author} actions={actions}/>
      );
    },
  },
];
