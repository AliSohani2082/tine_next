"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Filter } from "lucide-react";

import { ActionMenu } from "../_components/action-menu";
import SortingButton from "../_components/sortingButton";
import ShowMoreDrawer from "../_components/showMoreDrawer";
import { Action } from "../_components/action-menu";
import { toast } from "sonner";

export type AuthorTable = {
  name: string;
};

const Content = () =>{
  return (
    <span className="h-[250px] flex justify-center items-center">Content</span>
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
    onClick: (author: AuthorTable) => toast("آیتم مورد نظر با موفقیت به فیلتر ها اضافه شد", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    }),
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
