"use client";

import { useSettings } from "@/context/settings-context";
import type { FC } from "react";
import { cn } from "@/lib/utils";

interface DigitalClockProps {
  time: Date;
}

export const DigitalClock: FC<DigitalClockProps> = ({ time }) => {
  const { settings } = useSettings();
  const fontSize = `${(settings.size / 100) * 8}rem`;

  return (
    <div
      className={cn("font-bold tracking-widest transition-all duration-300", settings.fontFamily)}
      style={{
        color: settings.color,
        fontSize,
        lineHeight: 1,
      }}
      aria-label={`Digital clock showing ${time.toLocaleTimeString()}`}
    >
      {time.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        ...(settings.showSeconds && { second: "2-digit" }),
      })}
    </div>
  );
};
