"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Filter, ArrowUpDown } from "lucide-react";

import { ActionMenu } from "../_components/action-menu";
import { Button } from "@/components/ui/button";
import SortingButton from "../_components/sortingButton";
import ShowMoreDrawer from "../_components/showMoreDrawer";
import { Action } from "../_components/action-menu";

export type AuthorTable = {
  name: string;
};

const Content = () =>{
  return (
    <span className="h-[500px] flex justify-center items-center">Content</span>
  )
}

const actions: Action<AuthorTable>[] = [
  {
    label: "اطلاعات بیشتر",
    icon: <Eye />,
    onClick: (author: AuthorTable) => console.log("action done"),
    wraper: ShowMoreDrawer,
    component: <Content/>
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
      return <ActionMenu item={author} actions={actions} />;
    },
  },
];
