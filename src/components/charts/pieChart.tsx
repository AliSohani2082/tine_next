"use client"

import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration, ChartTypeRegistry, TooltipModel } from 'chart.js/auto';
import Tooltip from './Tooltip';

interface ChartProps {
  data: number[];
  labels: string[];
}

const CustomChart: React.FC<ChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'pie', number[], string>>();
  const [tooltipModel, setTooltipModel] = useState<TooltipModel<'pie'> | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length && labels.length) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(153, 102, 255)',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: false,
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
    <div>
      <canvas ref={chartRef} className='font-mono' />
      {tooltipModel && <Tooltip tooltipModel={tooltipModel} />}
    </div>
  );
};

export default CustomChart;
