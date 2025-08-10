"use client";

import { useSettings } from "@/context/settings-context";
import type { FC } from "react";

interface AnalogClockProps {
  time: Date;
}

export const AnalogClock: FC<AnalogClockProps> = ({ time }) => {
  const { settings } = useSettings();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  // Responsive sizing using CSS custom properties and clamp
  const getResponsiveSize = () => {
    const baseSize = 200 * (settings.size / 100); // Base size for mobile
    const maxSize = 400 * (settings.size / 100);  // Max size for desktop
    return {
      width: `clamp(${baseSize}px, ${baseSize}px + 10vw, ${maxSize}px)`,
      height: `clamp(${baseSize}px, ${baseSize}px + 10vw, ${maxSize}px)`,
    };
  };

  return (
    <div
      className="relative transition-all duration-300 mx-auto"
      style={{
        ...getResponsiveSize(),
        color: settings.color,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        aria-label={`Analog clock showing ${time.toLocaleTimeString()}`}
      >
        <circle
          cx="100"
          cy="100"
          r="98"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="opacity-20"
        />
        <g transform="translate(100, 100)">
          {/* Hour hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-40"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${hourDeg})`}
            className="transition-transform duration-1000 ease-elastic"
          />
          {/* Minute hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-65"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg})`}
            className="transition-transform duration-1000 ease-elastic"
          />
          {/* Second hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-80"
            stroke={settings.color}
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${secondDeg})`}
            className="transition-transform duration-200 ease-in-out"
          />
          <circle cx="0" cy="0" r="4" fill={settings.color} />
        </g>
      </svg>
    </div>
  );
};

// Add a custom easing for the elastic effect
const customStyles = `
  .ease-elastic {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
}
