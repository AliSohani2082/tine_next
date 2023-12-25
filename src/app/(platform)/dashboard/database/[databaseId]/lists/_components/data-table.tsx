"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/iconicCard";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdownMenu";
import { Input } from "@/components/ui/input";
import { ArrowDown, ArrowDownCircle, ArrowDownNarrowWide } from "lucide-react";
import { set } from "zod";
import { cn } from "@/lib/utils";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pageSize, setPageSize] = React.useState(10);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const tableOption = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  };

  const table = useReactTable(tableOption);

  const [SearchBy, SetSearchBy] = React.useState(
    table.getAllFlatColumns()[0].id
  );

  return (
    <Card>
      <CardHeader className="w-full text-3xl flex flex-row justify-end">
        {title}
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-row justify-between items-center gap-2 w-full py-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    ستون ها
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex items-center justify-center"
                    variant="outline"
                  >
                    <span>{SearchBy}</span>
                    {/* <ArrowDownCircle className="ml-2" /> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanFilter())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        dir="rtl"
                        className="capitalize"
                        checked={column.id === SearchBy}
                        onCheckedChange={() => {
                          SetSearchBy(column.id);
                          table.getColumn(column.id)?.setFilterValue("");
                          setColumnFilters([]);
                        }}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="ml-3">:</span>
              <span className="font-bold mr-3 text-sm w-[250px]">
                جست و جو براساس{" "}
              </span>
              <Input
                placeholder="جست و جو"
                value={
                  (table.getColumn(SearchBy)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(SearchBy)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="relative ">
            <Table>
              <TableHeader className="border-b-primary border-b-2">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "p-2 px-10",
                            cell.id.split('_')[1] === "Actions" ? "flex flex-row justify-end" : ""
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      نتیجه ای یافت نشد
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start gap-1 pl-2">
              <span>{table.getPageCount()}</span>
              <span>از</span>
              <span>{table.getState().pagination.pageIndex}</span>
              <span>صفحه</span>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <div className="flex flex-row justify-center gap-2">
                      <span>سطر</span>
                      <span>{pageSize}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {[10, 50, 100, 200].map((item) => (
                    <DropdownMenuCheckboxItem
                      checked={pageSize === item}
                      key={item}
                      onClick={() => {
                        setPageSize(item);
                        table.setPageSize(item);
                      }}
                    >
                      <div className="flex flex-row justify-center gap-2">
                        <span>سطر</span>
                        <span>{item}</span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious isActive={table.getState().pagination.pageIndex <= 0} onClick={() => table.previousPage()} />
                  </PaginationItem>
                  {table.getState().pagination.pageIndex === 0 && (
                    <PaginationItem>
                      <PaginationEllipsis/>
                    </PaginationItem>
                  )}
                  {
                    
                  [table.getState().pagination.pageIndex - 1, table.getState().pagination.pageIndex, table.getState().pagination.pageIndex + 1].map((item) => (
                    <PaginationItem key={item}>{item + 1}</PaginationItem>
                  ))}
                  {table.getPageCount() > table.getState().pagination.pageIndex && (
                    <PaginationItem>
                      <PaginationEllipsis/>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext isActive={table.getState().pagination.pageIndex >= table.getPageCount() - 1 } onClick={() => table.nextPage()} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                قبلی
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                بعدی
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
