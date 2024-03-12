"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { documents } from "@/data/dataAdaptor";
import { cn, getItemIndexes, numberToLetter } from "@/lib/utils";
import {
	ChevronDown,
	ChevronUp,
	Minus,
	MoreHorizontal,
	Plus,
} from "lucide-react";
import { useDownSlider } from "@/hooks/use-downSlider";
import { Separator } from "@/components/ui/separator";
import { useFilters } from "@/hooks/use-filter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type DocumentSliderProps = {
	id: string;
};

const lorem =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar massa eget nisi rutrum fermentum. Phasellus ultricies tortor et libero convallis, quis auctor risus egestas. Integer neque mi, mattis nec tortor a, imperdiet euismod ipsum. Nam id dolor a diam pretium tincidunt a nec velit. Phasellus fermentum, ante vitae pellentesque semper, justo lacus gravida sem, a luctus nulla orci a enim. Quisque accumsan tellus odio, ut pharetra mauris faucibus a. Fusce tempus fermentum odio, vitae placerat justo pulvinar at. Etiam facilisis orci imperdiet metus tempus, vitae condimentum lectus volutpat. Ut suscipit, metus eu vestibulum ullamcorper, sem lorem molestie ex, non luctus arcu est porttitor quam. Aliquam erat volutpat. Vivamus consectetur euismod lacinia. ";

const DocumentSlider: React.FC<DocumentSliderProps> = ({ id }) => {
	const document = documents.find((document) => document.id.toString() === id);
	// console.log(document?.authors)

	const { onOpen } = useDownSlider();
	const { add: addFilter, remove: removeFilter, filters } = useFilters();
	const [showMore, setShowMore] = useState(false);

	if (!document) return <div>Document not found</div>;

	const filterId = uuidv4();
	const isFilter = filters.some(
		(filter) => filter.dataId === document?.id && filter.type === "document",
	);
	const items: {
		key: string;
		value: string | null;
	}[] = [
		{
			key: "doi_index",
			value: document.doi_index,
		},
		{
			key: "Document Type",
			value: document.document_type,
		},
		{
			key: "Citation Count",
			value: document.citation_count.toString(),
		},
		{
			key: "Countries",
			value: document.countries.join(", "),
		},
	];
	return (
		<div className="h-full w-full flex justify-stretch items-stretch flex-row-reverse">
			<ScrollArea className="flex flex-col justify-center items-center w-1/3 h-full">
				<Card className="w-full mx-2">
					<CardContent className="flex flex-col justify-items-stretch items-stretch">
						<div className="border-gray-300 flex border-b-2 justify-between items-center cursor-default w-full h-12 px-2">
							<span className="text-sm font-bold">key</span>
							<span className="text-sm font-bold">value</span>
						</div>
						{items.map((item) => (
							<div
								key={item.key}
								className="border-t-2 transition-colors hover:bg-muted/50 cursor-default flex justify-between items-center w-full h-12 px-2"
							>
								<span className="text-sm">{item.key}</span>
								<span className="text-sm">{item.value}</span>
							</div>
						))}
					</CardContent>
				</Card>
				<div className="flex flex-col justify-center items-end">
					<div className="flex flex-row justify-start items-center flex-wrap gap-1 m-5">
						{document.keywords.map((keyword) => (
							<Badge key={keyword}>{keyword}</Badge>
						))}
					</div>
				</div>
			</ScrollArea>
			<ScrollArea className="w-2/3">
				<div className="w-full">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="w-[900px] flex">
								<span className="text-3xl w-full truncate">{document.title}</span>	
							</TooltipTrigger>
							<TooltipContent className="max-w-[700px]">
								<span className="text-xl w-full">{document.title}</span>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div className="w-full flex flex-row flex-wrap justify-start items-center gap-1">
						{document.authors.map((author, index) => (
							<Button
								key={index}
								onClick={() => onOpen({ id: author.id, type: "author" })}
								variant="link"
								className="m-0 p-0 h-auto"
							>
								<span>
									{author.name}
									<sup className="no-underline">
										{numberToLetter(index + 1)}
									</sup>
									<span className="no-underline">,</span>
								</span>
							</Button>
						))}
					</div>
					<div className="flex flex-col justify-center items-center w-full">
						<Button
							onClick={() => setShowMore(!showMore)}
							variant="ghost"
							className="mb-2"
						>
							<span>مشاهده {!showMore? "بیشتر" : "کمتر"}</span>
							{!showMore ? <ChevronDown /> : <ChevronUp />}
						</Button>
					</div>
					<div
						className={cn(
							"mx-3 transition-all",
							!showMore ? "h-0 overflow-clip" : "h-auto",
						)}
					>
						<div className="w-full pb-4 flex flex-col justify-start itemx-start">
							{/* {
                document.authors.map((item, index) => (
                  <span key={index}>{numberToLetter(index+1)},{item.organization}</span>
                ))
              } */}
							{getItemIndexes(
								document.authors.map((author) => author.organization),
							).map((item, index) => (
								<span key={index} className="text-sm">
									{item.indexes.map((ind, index) => (
										<span key={ind}>
											{numberToLetter(ind + 1)}
											{item.indexes.length !== index + 1 && ","}
										</span>
									))}
									{". "}
									{item.item}
								</span>
							))}
						</div>
					</div>
					<article className="flex flex-col mx-4 items-start justify-center">
						<p className="text-justify">
							<span className="font-bold">Abstract: </span>
							{document?.abstract || lorem}
						</p>
					</article>
					
				</div>
			</ScrollArea>
		</div>
	);
};

export default DocumentSlider;
