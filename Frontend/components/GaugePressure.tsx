import React, { useEffect, useState } from "react";

interface GaugePressureProps {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  stroke?: number;
  greenThreshold?: number; // fraction of max (0–1)
  yellowThreshold?: number; // fraction of max (0–1)
  animationDuration?: number;
}

export default function GaugePressure({
  value,
  min = 0,
  max = 1,
  size = 250,
  stroke = 20,
  greenThreshold = 0.6, // up to 60% = green
  yellowThreshold = 0.85, // 60–85% = yellow, >85% = red
  animationDuration = 800,
}: GaugePressureProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const start = displayValue;
    const end = Math.min(Math.max(value, min), max);
    const diff = end - start;
    if (diff === 0) return;

    let startTime: number | null = null;
    function animate(time: number) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / animationDuration, 1);
      const current = start + diff * progress;
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value, min, max, animationDuration]);

  const radius = (size - stroke) / 2;
  const center = size / 2;

  // Gauge fraction & needle angle (-90° to +90°)
  const fraction = (displayValue - min) / (max - min);
  const angle = -90 + fraction * 180;
  const needleLength = radius - stroke * 0.5;

  // Arc angles
  const greenArc = greenThreshold * 180;
  const yellowArc = (yellowThreshold - greenThreshold) * 180;
  const redArc = 180 - (greenArc + yellowArc);

  // Helpers
  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const rad = ((angleDeg - 90) * Math.PI) / 180.0;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  }

  // Needle endpoint
  const end = polarToCartesian(center, center, needleLength, angle);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2}>
        {/* Red (left) */}
        <path
          d={describeArc(center, center, radius, -90, -90 + redArc)}
          stroke="crimson"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />

        {/* Yellow (middle) */}
        <path
          d={describeArc(
            center,
            center,
            radius,
            -90 + redArc,
            -90 + redArc + yellowArc
          )}
          stroke="gold"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />

        {/* Green (right) */}
        <path
          d={describeArc(center, center, radius, -90 + redArc + yellowArc, 90)}
          stroke="limegreen"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={end.x}
          y2={end.y}
          stroke="black"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={center} cy={center} r={5} fill="black" />
      </svg>

      {/* Value Display */}
      <div className="mt-2 text-xl font-bold text-white">
        {displayValue.toFixed(1)} / {max}
      </div>
    </div>
  );
}
