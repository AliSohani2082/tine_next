"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, Filter } from "lucide-react";

import { ActionMenu } from "../_components/action-menu";
import SortingButton from "../_components/sortingButton";
import ShowMoreDrawer from "../_components/showMoreDrawer";
import { toast } from 'sonner'

export type DocumentTable = {
  title: string;
  publisher: string;
  author: string;
};

const Content = () =>{
  return (
    <span className="h-[250px] flex justify-center items-center">Content</span>
  )
}

const actions = [
  {
    label: "اطلاعات بیشتر",
    icon: <Eye />,
    onClick: (document: DocumentTable) => console.log("action done"),
    wraper: ShowMoreDrawer,
    component: <Content/>,
  },
  {
    label: "اضافه کردن به فیلتر",
    icon: <Filter />,
    onClick: (document: DocumentTable) => toast("آیتم مورد نظر با موفقیت به فیلتر ها اضافه شد", {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    }),
  },
  {
    label: "کپی کردن لینک",
    icon: <Copy />,
    onClick: (document: DocumentTable) => {
      navigator.clipboard.writeText(document.title)
      toast.success("لینک کپی شد")
    },
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
