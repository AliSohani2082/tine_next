"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Document } from "../types";
import { Copy, Eye, Filter, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdownMenu";
import { Button } from "@/components/ui/button";
import { ActionMenu } from "../_components/action-menu";

export type DocumentTable = {
  title: string;
  publisher: string;
  author: string;
};

const actions = [
  {
    label: "اطلاعات بیشتر",
    icon: <Eye />,
    onClick: (document: DocumentTable) => console.log("action done"),
  },
  {
    label: "اضافه کردن به فیلتر",
    icon: <Filter />,
    onClick: (document: DocumentTable) => console.log("action done"),
  },
  {
    label: "کپی کردن لینک",
    icon: <Copy />,
    onClick: (document: DocumentTable) => navigator.clipboard.writeText(document.title) 
  }
];

export const columns: ColumnDef<DocumentTable>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "publisher",
    header: "publisher",
  },
  {
    accessorKey: "author",
    header: "author",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;

      return (
        <ActionMenu item={document} actions={actions}/>
      );
    },
  },
];
