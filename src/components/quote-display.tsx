"use client";

import { useSettings } from "@/context/settings-context";
import { getTimeOfDay } from "@/lib/time-utils";
import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOCAL_QUOTES: Record<string, string[]> = {
  morning: [
    "The key is in not spending time, but in investing it.",
    "Lost time is never found again.",
    "Your future is created by what you do today, not tomorrow.",
  ],
  afternoon: [
    "Time is what we want most, but what we use worst.",
    "The afternoon knows what the morning never suspected.",
    "Don’t watch the clock; do what it does. Keep going.",
  ],
  evening: [
    "The future is purchased by the present.",
    "The best time to start was yesterday. The next best time is now.",
    "Time you enjoy wasting is not wasted time.",
  ],
  night: [
    "Embrace the darkness; the stars reveal their beauty at night.",
    "To sleep: perchance to dream.",
    "Every day ends with a night; every effort deserves a rest.",
  ],
};

function pickQuote(timeOfDay: string): string {
  const list = LOCAL_QUOTES[timeOfDay as keyof typeof LOCAL_QUOTES] || LOCAL_QUOTES.morning;
  return list[Math.floor(Math.random() * list.length)];
}

export const QuoteDisplay = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useSettings();

  const timeOfDay = useMemo(() => getTimeOfDay(new Date()), []);

  useEffect(() => {
    setIsLoading(true);
    const q = pickQuote(timeOfDay);
    setQuote(q);
    setIsLoading(false);
  }, [timeOfDay]);
  
  if (settings.activeTab !== 'time') {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-2xl px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-lg italic text-muted-foreground"
        >
          {isLoading ? "Loading quote..." : `“${quote}”`}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
