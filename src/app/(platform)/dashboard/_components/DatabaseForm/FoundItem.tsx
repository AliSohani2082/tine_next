"use client";

import React from "react";
import { Book, User, X } from "lucide-react";

import { Document } from "@/types/items";
import { CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type FoundItemProps = {
	data: Document;
};

const FoundItem: React.FC<FoundItemProps> = ({ data }) => {
	return (
		<Card className="my-4 mx-10 w-[500px] rounded-xl hover:cursor-pointer">
			<CardHeader className="w-full">
				<Tooltip>
					<TooltipTrigger className="w-full h-full flex flex-row justify-stretch items-center gap-5">
						<Book size={20} className="w-[50px]" />
						<h2 className="truncate font-semibold">{data.title}</h2>
					</TooltipTrigger>
					<TooltipContent className="max-w-[400px]">
						<h2 className="font-semibold">{data.title}</h2>
					</TooltipContent>
				</Tooltip>
			</CardHeader>
			<CardContent className="relative flex-1 flex flex-col justify-start items-start gap-4">
				{/* <span className="font-bold text-base">Anstract</span> */}
				<span className="max-h-[100px] text-justify overflow-clip bg-clip-text text-transparent bg-gradient-to-t from-transparent to-black dark:to-gray-500">
					<span className="font-bold">Abstract: </span>
					{data.abstract}
				</span>
			</CardContent>
		</Card>
	);
};

export default FoundItem;
