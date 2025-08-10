"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, Gift } from "lucide-react";
import Link from "next/link";

interface Holiday {
  name: string;
  date: Date;
  emoji: string;
  description: string;
  slug: string;
  wikipediaUrl: string;
}

const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;
  return new Date(year, n - 1, p + 1);
};

const getMothersDay = (year: number): Date => {
  const date = new Date(year, 4, 1);
  const firstSunday = new Date(date.setDate(date.getDate() - date.getDay() + 7));
  return new Date(firstSunday.setDate(firstSunday.getDate() + 7));
};

const getFathersDay = (year: number): Date => {
  const date = new Date(year, 5, 1);
  const thirdSunday = new Date(date.setDate(date.getDate() - date.getDay() + 14));
  return new Date(thirdSunday.setDate(thirdSunday.getDate() + 7));
};

const getThanksgiving = (year: number): Date => {
  const date = new Date(year, 10, 1);
  const fourthThursday = new Date(date.setDate(date.getDate() - date.getDay() + 21));
  return new Date(fourthThursday.setDate(fourthThursday.getDate() + 7));
};

const getHolidays = (): Holiday[] => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  const holidays: Holiday[] = [
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear() + 1, 0, 1),
    emoji: "🎉",
    slug: "new-years-day",
    description: "The first day of the Gregorian calendar year.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/New_Year%27s_Day"
  },
  {
    name: "Martin Luther King Jr. Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 0 || (new Date().getMonth() === 0 && new Date().getDate() > 20) ? 1 : 0), 0, 20),
    emoji: "✊",
    slug: "martin-luther-king-jr-day",
    description: "Federal holiday honoring civil rights leader Martin Luther King Jr.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr._Day"
  },
  {
    name: "Valentine's Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 1 || (new Date().getMonth() === 1 && new Date().getDate() > 14) ? 1 : 0), 1, 14),
    emoji: "💝",
    slug: "valentines-day",
    description: "A celebration of love and affection between intimate companions.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Valentine%27s_Day"
  },
  {
    name: "Presidents' Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 1 || (new Date().getMonth() === 1 && new Date().getDate() > 17) ? 1 : 0), 1, 17),
    emoji: "🇺🇸",
    slug: "presidents-day",
    description: "Federal holiday honoring all American presidents.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Presidents%27_Day"
  },
  {
    name: "St. Patrick's Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 2 || (new Date().getMonth() === 2 && new Date().getDate() > 17) ? 1 : 0), 2, 17),
    emoji: "🍀",
    slug: "st-patricks-day",
    description: "Cultural and religious celebration held on 17 March.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Saint_Patrick%27s_Day"
  },
  {
    name: "Easter",
    date: getEasterDate(new Date().getFullYear() + (new Date().getMonth() > 3 ? 1 : 0)),
    emoji: "🐰",
    slug: "easter",
    description: "Christian holiday celebrating the resurrection of Jesus Christ.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Easter"
  },
  {
    name: "Earth Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 3 || (new Date().getMonth() === 3 && new Date().getDate() > 22) ? 1 : 0), 3, 22),
    emoji: "🌍",
    slug: "earth-day",
    description: "Annual event demonstrating support for environmental protection.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Earth_Day"
  },
  {
    name: "Mother's Day",
    date: getMothersDay(new Date().getFullYear() + (new Date().getMonth() > 4 ? 1 : 0)),
    emoji: "👩‍👧‍👦",
    slug: "mothers-day",
    description: "A celebration honoring mothers and motherhood.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Mother%27s_Day"
  },
  {
    name: "Memorial Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 4 ? 1 : 0), 4, 25),
    emoji: "🇺🇸",
    slug: "memorial-day",
    description: "Federal holiday honoring military personnel who died in service.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Memorial_Day"
  },
  {
    name: "Father's Day",
    date: getFathersDay(new Date().getFullYear() + (new Date().getMonth() > 5 ? 1 : 0)),
    emoji: "👨‍👧‍👦",
    slug: "fathers-day",
    description: "A celebration honoring fathers and fatherhood.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Father%27s_Day"
  },
  {
    name: "Independence Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 6 || (new Date().getMonth() === 6 && new Date().getDate() > 4) ? 1 : 0), 6, 4),
    emoji: "🇺🇸",
    slug: "independence-day",
    description: "Commemorates the Declaration of Independence of the United States.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Independence_Day_(United_States)"
  },
  {
    name: "Labor Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 8 ? 1 : 0), 8, 1),
    emoji: "👷",
    slug: "labor-day",
    description: "Federal holiday celebrating the American labor movement.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Labor_Day"
  },
  {
    name: "Columbus Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 9 || (new Date().getMonth() === 9 && new Date().getDate() > 12) ? 1 : 0), 9, 12),
    emoji: "⛵",
    slug: "columbus-day",
    description: "Federal holiday commemorating Christopher Columbus's arrival in the Americas.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Columbus_Day"
  },
  {
    name: "Halloween",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 9 || (new Date().getMonth() === 9 && new Date().getDate() > 31) ? 1 : 0), 9, 31),
    emoji: "🎃",
    slug: "halloween",
    description: "A celebration observed on October 31st with costumes and trick-or-treating.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Halloween"
  },
  {
    name: "Veterans Day",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() > 10 || (new Date().getMonth() === 10 && new Date().getDate() > 11) ? 1 : 0), 10, 11),
    emoji: "🎖️",
    slug: "veterans-day",
    description: "Federal holiday honoring military veterans.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Veterans_Day"
  },
  {
    name: "Thanksgiving",
    date: getThanksgiving(new Date().getFullYear() + (new Date().getMonth() > 10 ? 1 : 0)),
    emoji: "🦃",
    slug: "thanksgiving",
    description: "A national holiday celebrated as a day of giving thanks.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Thanksgiving_(United_States)"
  },
  {
    name: "Christmas",
    date: new Date(new Date().getFullYear() + (new Date().getMonth() === 11 && new Date().getDate() > 25 ? 1 : 0), 11, 25),
    emoji: "🎄",
    slug: "christmas",
    description: "Christian holiday celebrating the birth of Jesus Christ.",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Christmas"
  }
];
  return holidays.filter(holiday => holiday.date > new Date()); // Only show future holidays
};

const formatTimeRemaining = (targetDate: Date): string => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) return "Event has passed";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
};

export const HolidayCountdown = () => {
  const [holidays] = useState<Holiday[]>(getHolidays());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="space-y-2">
        {holidays.map((holiday) => {
          const holidayYear = holiday.date.getFullYear();
          const holidayDate = holiday.date.toLocaleDateString('en-GB', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          
          return (
            <Link href={`/${holiday.slug}/${holidayYear}`} key={holiday.name}>
              <div className="flex justify-between items-center py-1 px-3 rounded hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{holiday.emoji}</span>
                  <span className="font-medium text-sm">{holiday.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{holidayDate}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
