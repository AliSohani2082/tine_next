"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, Filter } from "lucide-react";

import { ActionMenu } from "../_components/action-menu";
import SortingButton from "../_components/sortingButton";

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
    onClick: (document: DocumentTable) =>
      navigator.clipboard.writeText(document.title),
  },
];

export const columns: ColumnDef<DocumentTable>[] = [
  {
    accessorKey: "title",
    id: "Title",
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Title" />,
  },
  {
    accessorKey: "publisher",
    id: "Publisher",
    header: ({ column }) => <SortingButton column={column} title="Publisher" />,
  },
  {
    accessorKey: "author",
    id: "Author",
    header: ({ column }) => <SortingButton column={column} title="Author" />,
  },
  {
    id: "Actions",
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const document = row.original;

      return <ActionMenu item={document} actions={actions} />;
    },
  },
];
