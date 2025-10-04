import React from "react";

interface BarChartProps {
  labels: string[];
  values: number[];
  max?: number;
  width?: number;
  height?: number;
  barColor?: string;
  bgColor?: string;
}

export default function BarChart({
  labels,
  values,
  max = 100,
  width = 400,
  height = 200,
  barColor = "var(--main-color)",
  bgColor = "rgba(255,255,255,0.1)",
}: BarChartProps) {
  const barWidth = width / (values.length * 2);

  return (
    <svg width={width} height={height + 30} className="overflow-visible">
      {values.map((val, i) => {
        const barHeight = (val / max) * (height - 20);

        return (
          <g key={i}>
            <rect
              x={i * barWidth * 2 + barWidth / 2}
              y={0}
              width={barWidth}
              height={height - 20}
              fill={bgColor}
              rx={4}
            />
            <rect
              x={i * barWidth * 2 + barWidth / 2}
              y={height - 20 - barHeight}
              width={barWidth}
              height={barHeight}
              fill={barColor}
              rx={4}
              className="transition-all duration-700 ease-out"
            />
            <text
              x={i * barWidth * 2 + barWidth}
              y={height + 5}
              textAnchor="middle"
              fontSize="14"
              fill="white"
            >
              {val}%
            </text>
            <text
              x={i * barWidth * 2 + barWidth}
              y={-10}
              textAnchor="middle"
              fontSize="14"
              fill="white"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
