import React from "react";
import { TooltipModel, ChartTypeRegistry } from "chart.js";

interface TooltipProps<TType extends keyof ChartTypeRegistry> {
	tooltipModel: TooltipModel<TType>;
}

const Tooltip = <TType extends keyof ChartTypeRegistry>({
	tooltipModel,
}: TooltipProps<TType>) => {
	if (!tooltipModel || !tooltipModel.dataPoints) {
		return null;
	}

	const { body } = tooltipModel;

	return (
		<div
			className="bg-gray-200 dark:bg-gray-900 text-black dark:text-gray-200"
			style={{
				padding: "10px",
				borderRadius: "5px",
				color: "#fff",
			}}
		>
			{body.map((line, index) => (
				<div key={index}>{line.lines}</div>
			))}
		</div>
	);
};

export default Tooltip;
