"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Eye, Filter, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdownMenu";
import { Button } from "@/components/ui/button";

export type CountryTable = {
  name: string;
  documentPublished: number;
};

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
      const document = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem className="flex justify-between">
              <Eye className="mr-2 w-6 h-6 text-primary" />
              <span>مشاهده جزيات</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <Filter className="mr-2 w-6 h-6 text-primary" />
              <span>اضافه کردن به فیلتر ها</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
