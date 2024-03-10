"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface LineChartProps {
	data: number[];
	labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart>();

	useEffect(() => {
		if (chartRef.current && data.length && labels.length) {
			const ctx = chartRef.current.getContext("2d");
			if (ctx) {
				chartInstance.current = new Chart(ctx, {
					type: "line",
					data: {
						labels: labels,
						datasets: [
							{
								label: "Line Chart",
								data: data,
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								tension: 0.1,
							},
						],
					},
					options: {
						scales: {
							x: {
								type: "category",
								title: {
									display: true,
									text: "سال",
									font: {
										size: 24, // Change the font size as needed
										weight: "bold", // Optionally, change the font weight
									},
								},
								ticks: {
									font: {
										size: 14, // Change the font size of the ticks as needed
									},
								},
							},
							y: {
								title: {
									display: true,
									text: "تعداد مقالات",
									font: {
										size: 24, // Change the font size as needed
										weight: "bold", // Optionally, change the font weight
									},
								},
								ticks: {
									font: {
										size: 14, // Change the font size of the ticks as needed
									},
								},
							},
						},
						plugins: {
							legend: {
								display: false, // Set display to false to remove the legend
							},
						},
					},
				});
			}
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data, labels]);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<canvas ref={chartRef} className="w-full h-full" />
		</div>
	);
};

export default LineChart;
