import React from 'react';
import { TooltipModel, ChartTypeRegistry } from 'chart.js';

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
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
      {body.map((line, index) => (
        <div key={index}>{line.lines}</div>
      ))}
    </div>
  );
};

export default Tooltip;
