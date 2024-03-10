"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IFilter } from "@/types";
import { cn } from "@/lib/utils";
import { useDownSlider } from "@/hooks/use-downSlider";

type FilterItemProps = {
	filter: IFilter;
	data: {
		title: string;
		icon: React.ReactNode;
	};
	removeFilter: (id: string) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({
	filter,
	data,
	removeFilter,
}) => {
	const { onOpen, onClose, isOpen, item: sliderItem } = useDownSlider();
	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		setIsActive(
			isOpen &&
				filter.dataId === sliderItem?.id &&
				filter.type === sliderItem?.type,
		);
	}, [isOpen, sliderItem, filter]);

	return (
		<div
			key={filter.dataId}
			className={cn(
				"border-2 flex transition-all justify-between hover:cursor-pointer rounded-md  h-10 max-h-10 p-0 px-2 m-1",
				isActive ? "bg-primary text-muted" : "",
			)}
		>
			<div
				className="w-full h-full flex flex-row justify-start items-center"
				onClick={() => {
					if (isActive) {
						setIsActive(false);
						onClose();
					} else {
						setIsActive(true);
						onOpen({
							id: filter.dataId,
							type: filter.type,
						});
					}
				}}
			>
				<div className="flex w-full overflow-hidden flex-row justify-center items-center gap-2">
					{data?.icon}
					<p className="text-clip max-h-10 max-w-prose w-full h-full">
						{data?.title}
					</p>
				</div>
			</div>
			<Button
				variant="ghost"
				onClick={() => {
					removeFilter(filter.id);
				}}
			>
				<X />
			</Button>
		</div>
	);
};

export default FilterItem;
