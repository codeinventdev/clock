"use client";

import { useSettings } from "@/context/settings-context";
import { timeToWords } from "@/lib/time-utils";
import type { FC } from "react";
import { cn } from "@/lib/utils";

interface TextClockProps {
  time: Date;
}

export const TextClock: FC<TextClockProps> = ({ time }) => {
  const { settings } = useSettings();
  const timeWords = timeToWords(time);
  
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

  // Responsive font sizing for text clock
  const getResponsiveFontSize = () => {
    const baseSize = 1.5 * (settings.size / 100); // 1.5rem on mobile
    const maxSize = 3 * (settings.size / 100);    // 3rem on desktop
    return {
      fontSize: `clamp(${baseSize}rem, ${baseSize}rem + 2vw, ${maxSize}rem)`,
    };
  };

  return (
    <div
      className={cn("max-w-xl p-4 font-semibold transition-all duration-300 text-center", getFontFamily())}
      style={{
        color: settings.color,
        lineHeight: 1.2,
        ...getResponsiveFontSize(),
      }}
      aria-label={`Text clock saying: ${timeWords}`}
    >
      {timeWords}
    </div>
  );
};
