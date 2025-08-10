"use client";

import { useSettings } from "@/context/settings-context";
import type { FC } from "react";
import { cn } from "@/lib/utils";

interface DigitalClockProps {
  time: Date;
}

export const DigitalClock: FC<DigitalClockProps> = ({ time }) => {
  const { settings } = useSettings();
  
  const getFontFamily = () => {
    switch (settings.fontFamily) {
      case 'font-body':
        return 'font-body';
      case 'font-mono':
        return 'font-mono';
      case 'font-orbitron':
        return 'font-orbitron';
      case 'font-press-start':
        return 'font-press-start';
      case 'font-digital':
        return 'font-digital';
      default:
        return 'font-body';
    }
  };

  // Get base sizes for responsive scaling
  const getBaseSizeClasses = () => {
    return {
      base: 3, // 3rem on mobile
      md: 8,   // 8rem on desktop
    };
  };

  const sizeClasses = getBaseSizeClasses();
  const scaleFactor = settings.size / 100;
  
  // Calculate responsive font sizes using clamp()
  const getResponsiveFontSize = () => {
    const baseSize = sizeClasses.base * scaleFactor;
    const mdSize = sizeClasses.md * scaleFactor;
    return {
      fontSize: `clamp(${baseSize}rem, ${baseSize}rem + 4vw, ${mdSize}rem)`,
    };
  };

  return (
    <div
      className={cn("font-bold tracking-widest transition-all duration-300", getFontFamily())}
      style={{
        color: settings.color,
        lineHeight: 1,
        ...getResponsiveFontSize(),
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
