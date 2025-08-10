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
  const fontSize = `${(settings.size / 100) * 3}rem`;

  return (
    <div
      className={cn("max-w-xl p-4 font-semibold transition-all duration-300", settings.fontFamily)}
      style={{
        color: settings.color,
        fontSize,
        lineHeight: 1.2,
      }}
      aria-label={`Text clock saying: ${timeWords}`}
    >
      {timeWords}
    </div>
  );
};
