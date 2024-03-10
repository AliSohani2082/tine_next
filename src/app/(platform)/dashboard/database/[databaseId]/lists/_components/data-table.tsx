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
import { cn } from "@/lib/utils";
import { Pagination } from "./pagination";
import { View } from "./view";

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
		[],
	);
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
		table.getAllFlatColumns()[0].id,
	);

	return (
		<Card>
			<CardHeader className="w-full text-3xl flex flex-row justify-end">
				{title}
			</CardHeader>
			<CardContent>
				<div>
					<div className="flex flex-row justify-between items-center gap-2 w-full py-4">
						<View table={table} />
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
																header.getContext(),
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
														cell.id.split("_")[1] === "Actions"
															? "flex flex-row justify-end"
															: "",
													)}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
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
					<div className="flex items-center justify-end space-x-2 py-4 w-full">
						<Pagination table={table} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
