"use client";

import { useSettings } from "@/context/settings-context";
import { useEffect, useState } from "react";
import { AnalogClock } from "./clocks/analog-clock";
import { DigitalClock } from "./clocks/digital-clock";
import { TextClock } from "./clocks/text-clock";

interface SharedTimerDisplayProps {
  showSeconds?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  timezone?: string;
}

export const SharedTimerDisplay = ({ 
  showSeconds, 
  size = "large",
  className = "",
  timezone
}: SharedTimerDisplayProps) => {
  const [time, setTime] = useState(new Date());
  const { settings } = useSettings();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Use settings.showSeconds if showSeconds prop is not provided
  const shouldShowSeconds = showSeconds !== undefined ? showSeconds : settings.showSeconds;

  const getBaseSizeClasses = () => {
    switch (size) {
      case "small":
        return { base: 4, md: 5 };
      case "medium":
        return { base: 6, md: 7 };
      case "large":
      default:
        return { base: 8, md: 9 };
    }
  };

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      ...(shouldShowSeconds && { second: '2-digit' }),
      ...(timezone && { timeZone: timezone })
    };
    
    return time.toLocaleTimeString('en-US', options);
  };

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

  const sizeClasses = getBaseSizeClasses();
  const scaleFactor = settings.size / 100;
  
  // Calculate responsive font sizes based on settings
  const getResponsiveFontSize = () => {
    const baseSize = sizeClasses.base * scaleFactor;
    const mdSize = sizeClasses.md * scaleFactor;
    return {
      fontSize: `clamp(${baseSize}rem, ${baseSize}rem + 2vw, ${mdSize}rem)`,
    };
  };

  // Create a Date object for the current time (with timezone if specified)
  const displayTime = timezone ? 
    new Date(time.toLocaleString("en-US", { timeZone: timezone })) : 
    time;

  // For analog and text modes, use the clock components
  if (settings.mode === "analog") {
    const scaledSize = size === "small" ? 150 : size === "medium" ? 250 : 300;
    const finalSize = scaledSize * (settings.size / 100);
    return (
      <div className={`flex justify-center ${className}`} style={{ transform: `scale(${Math.min(finalSize / 300, 2)})` }}>
        <AnalogClock time={displayTime} />
      </div>
    );
  }

  if (settings.mode === "text") {
    return (
      <div className={`flex justify-center ${className}`}>
        <TextClock time={displayTime} />
      </div>
    );
  }

  // Default to digital mode - but use the existing SharedTimerDisplay logic for digital
  return (
    <div 
      className={`${getFontFamily()} font-bold tracking-wider transition-all duration-500 ${className}`}
      style={{
        color: settings.color,
        lineHeight: 1,
        ...getResponsiveFontSize(),
      }}
    >
      {formatTime()}
    </div>
  );
};
