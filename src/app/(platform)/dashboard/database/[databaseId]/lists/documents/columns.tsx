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

export type DocumentTable = {
  title: string;
  publisher: string;
  author: string;
};

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(document.title)}
              className="flex justify-between"
            >
              <Copy className="mr-2 w-4 h-4" />
              <span>کپی نام مقاله</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between">
              <Eye className="mr-2 w-4 h-4" />
              <span>مشاهده مقاله</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-end">
              <Filter className="mr-2 w-4 h-4" />
              <span>اضافه کردن به فیلتر ها</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
