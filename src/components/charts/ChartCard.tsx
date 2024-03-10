"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Expand } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

export type ChartCardProps = {
	children: React.ReactNode;
	title: string;
	className?: string;
};

const ChartCard: React.FC<ChartCardProps> = ({
	children,
	className,
	title,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Card
			className={cn(
				"flex flex-col justify-start items-stretch w-full h-full",
				className,
			)}
		>
			<CardHeader className="w-ful flex justify-center items-center text-3xl font-semibold">
				{title}
			</CardHeader>
			{/* <CardHeader className="flex flex-row justify-end items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button size="icon" variant="ghost">
              <Expand />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-10 pt-14">{children}</DialogContent>
        </Dialog>
      </CardHeader> */}
			<CardContent className="m-0 mt-5 h-full">{children}</CardContent>
		</Card>
	);
};

export default ChartCard;
