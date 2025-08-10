"use client";

import { useSettings } from "@/context/settings-context";
import { useEffect, useState } from "react";
import { AnalogClock } from "./clocks/analog-clock";
import { DigitalClock } from "./clocks/digital-clock";
import { TextClock } from "./clocks/text-clock";

export const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());
  const { settings } = useSettings();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const renderClock = () => {
    switch (settings.mode) {
      case "analog":
        return <AnalogClock time={time} />;
      case "text":
        return <TextClock time={time} />;
      case "digital":
      default:
        return <DigitalClock time={time} />;
    }
  };
  
  if (settings.activeTab !== 'time') {
    return null;
  }

  return (
    <div className="flex items-center justify-center transition-all duration-500">
      {renderClock()}
    </div>
  );
};
