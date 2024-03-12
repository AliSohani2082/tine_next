"use client";

import React, { FC, useId, useRef, useState } from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import geoUrl from "./country.json";
import { Plus, Minus, Target } from "lucide-react";
// import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipRefProps, Tooltip } from "react-tooltip";
import { Card } from "../ui/card";
import { Country } from "@/types/items";
import { Button } from "../ui/button";
import { countries } from "@/data/dataAdaptor";
import { useDownSlider } from "@/hooks/use-downSlider";

const shadow_custom_world_map = "shadow-md";

const legends: { color: string; name: string; min: number; max?: number }[] = [
	{ color: "#369b94", name: "بیش از ۱۰۰۰", min: 1000, max: undefined },
	{ color: "#46beb5", name: "۵۰۰ - ۱۰۰۰", min: 500, max: 1000 },
	{ color: "#6cccc5", name: "۱۰۰ - ۵۰۰", min: 100, max: 500 },
	{ color: "#92d9d4", name: "۵۰ - ۱۰۰", min: 50, max: 100 },
	{ color: "#cdedeb", name: "۰ - ۵۰", min: 0, max: 50 },
];

interface WorldMapProps {
	width?: number;
	height?: number;
	data: Country[];
}

const WorldMap: React.FC<WorldMapProps> = ({ data, width, height }) => {
	const newGeoUrl = {
		...geoUrl,
		objects: {
			world: {
				type: geoUrl.objects.world.type,
				geometries: geoUrl.objects.world.geometries.map((geo) => ({
					...geo,
					properties: {
						...geo.properties,
						color: legends.find(
							(legend) =>
								legend.min <=
									(data.find((d) => d.name === geo.properties.name)
										?.documentPublished || 0) &&
								(!legend.max
									? true
									: legend.max >
									  (data.find((d) => d.name === geo.properties.name)
											?.documentPublished || 0)),
						)?.color,
					},
				})),
			},
		},
	};

	const { onOpen, onClose } = useDownSlider();
	let tooltip = useRef<TooltipRefProps>(null);

	const [tooltipContent, setTooltipContent] = useState<string>();
	const [position, setPosition] = useState<{
		coordinates: [number, number];
		zoom: number;
	}>({
		coordinates: [81, 13],
		zoom: 1.75,
	});

	const handleZoomIn = () => {
		if (position.zoom >= 4) return;
		setPosition((prev) => ({ ...prev, zoom: prev.zoom + 1 }));
	};

	const handleZoomOut = () => {
		if (position.zoom <= 1) return;
		setPosition((prev) => ({ ...prev, zoom: prev.zoom - 1 }));
	};

	const handleCenter = () => {
		setPosition({ zoom: 1, coordinates: [1, 1] });
	};

	const handleMoveEnd = (position: {
		coordinates: [number, number];
		zoom: number;
	}) => {
		setPosition(position);
	};

	const id = useId();
	return (
		<div className="relative h-[600px] overflow-clip">
			{/* Map 🗺️ */}
			<ComposableMap
				// width={width}
				height={600}
				className="overflow-hidden"
				projection="geoMercator"
			>
				<ZoomableGroup
					zoom={position.zoom}
					center={position.coordinates}
					onMoveEnd={handleMoveEnd}
				>
					<Geographies geography={newGeoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onClick={() => {
											const id = countries.find(
												(country) => country.name === geo.properties.name,
											)?.id;
											if (id) {
												onOpen({
													id: id.toString(),
													type: "country",
												});
											}
										}}
										onMouseEnter={() => {
											document.body.classList.add("target");
											setTooltipContent(geo.properties.name);
										}}
										onMouseLeave={() => {
											document.body.classList.remove("target");
										}}
										fill={geo.properties.color}
										stroke="#bec1c4"
										strokeWidth="0.5"
										className="focus:outline-none"
										data-tooltip-id={id}
									/>
								);
							})
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			{/* Tooltip💡 */}
			{tooltipContent && (
				<Tooltip
					ref={tooltip}
					id={id}
					float
					className={`!p-2 !rounded-lg !bg-white !dark:bg-slate-800 !text-inherit ${shadow_custom_world_map} select-none z-10`}
					opacity={1}
				>
					<div className="flex gap-x-5">
						<div className="flex justify-center items-center">
							<p className="font-primary-Regular font-bold ">
								{tooltipContent}
							</p>
						</div>
						<div>
							<small className="font-primary-Regular">تعداد مقالات</small>
							<p className="text-sm font-primary-Regular">
								{data.find((d) => d.name === tooltipContent)
									?.documentPublished || 0}
							</p>
						</div>
					</div>
				</Tooltip>
			)}
			{/* Zoom in-out 🔍🔎 */}
			<div className="absolute right-0 bottom-0">
				<Card
					className={` rounded-lg p-2 mx-3 my-1 ${shadow_custom_world_map}`}
				>
					<Button
						variant="none"
						className="block p-1 pb-2"
						title="zoom in"
						type="button"
						onClick={handleZoomIn}
					>
						<Plus />
					</Button>
					<Button
						variant="none"
						className="block p-1 pt-2"
						title="zoom out"
						type="button"
						onClick={handleZoomOut}
					>
						<Minus />
					</Button>
				</Card>

				<Button
					variant="outline"
					title="center"
					type="button"
					onClick={handleCenter}
					className={`p-3 mx-3 mt-1 mb-2 rounded-lg float-right ${shadow_custom_world_map}`}
				>
					<Target />
				</Button>
			</div>
			{/* Legends 📑 */}
			<Card
				className={`absolute right-0 top-0 rounded-2xl p-2 m-3 ${shadow_custom_world_map}`}
			>
				{legends.map(({ color, name }) => {
					return (
						<div
							key={color}
							className="font-primary-Regular flex justify-end items-center my-1.5 gap-x-3"
						>
							<span className="text-base">{name}</span>
							<div
								className="w-4 h-4 rounded-sm"
								style={{ background: color }}
							/>
						</div>
					);
				})}
			</Card>
		</div>
	);
};

export default WorldMap;
