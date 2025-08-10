"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, Clock, Gift, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

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
  return new Date(fourthThursday.setDate(fourthThursday.getDate() + 3));
};

import { useRouter } from "next/navigation";
import { AdPlaceholder } from "./ad-placeholder";
import { getSlotForPlacement } from "@/lib/adsense";
import { Navigation } from "./navigation";

interface Holiday {
  name: string;
  date: Date;
  emoji: string;
  description: string;
  slug: string;
  wikipediaUrl?: string;
}

const getHolidays = () => {
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

const getHolidayBySlug = (slug: string): Holiday | null => {
  const holidays = getHolidays();
  // Handle both old format (slug) and new format (slug-year)
  const slugWithoutYear = slug.includes('-') && /\d{4}$/.test(slug) 
    ? slug.substring(0, slug.lastIndexOf('-')) 
    : slug;
  return holidays.find(holiday => holiday.slug === slugWithoutYear) || null;
};

const formatTimeRemaining = (targetDate: Date): { 
  days: number; 
  hours: number; 
  minutes: number; 
  seconds: number; 
  isExpired: boolean;
} => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isExpired: false };
};

interface HolidayTimerPageProps {
  holidaySlug: string;
}

export const HolidayTimerPage = ({ holidaySlug }: HolidayTimerPageProps) => {
  const router = useRouter();
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const foundHoliday = getHolidayBySlug(holidaySlug);
    if (!foundHoliday) {
      router.push('/timer');
      return;
    }
    setHoliday(foundHoliday);
  }, [holidaySlug, router]);

  useEffect(() => {
    if (!holiday) return;
    
    const updateTimer = () => {
      setTimeRemaining(formatTimeRemaining(holiday.date));
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, [holiday]);

  if (!holiday) {
    return (
      <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Holiday Not Found</h1>
          <Link href="/timer">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Timer
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
      <Navigation />
      <main className="flex-grow flex flex-col items-center justify-center overflow-hidden w-full pt-20">

      {/* Main Holiday Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl">{holiday.emoji}</span>
          {holiday.name}
        </h1>
        <h2 className="text-2xl text-muted-foreground mb-2">
          How many days until {holiday.name}?
        </h2>
        <p className="text-lg text-muted-foreground">{holiday.description}</p>
      </div>

      {/* Countdown Display */}
      <Card className="w-full max-w-4xl mb-8">
        <CardContent className="p-8">
          {timeRemaining.isExpired ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-4">
                🎉 {holiday.name} has arrived! 🎉
              </div>
              <p className="text-lg text-muted-foreground">
                Hope you're enjoying the celebration!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col">
                <div className="text-4xl md:text-6xl font-mono font-bold text-primary">
                  {timeRemaining.days}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2">
                  {timeRemaining.days === 1 ? 'Day' : 'Days'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-4xl md:text-6xl font-mono font-bold text-primary">
                  {timeRemaining.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2">
                  {timeRemaining.hours === 1 ? 'Hour' : 'Hours'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-4xl md:text-6xl font-mono font-bold text-primary">
                  {timeRemaining.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2">
                  {timeRemaining.minutes === 1 ? 'Minute' : 'Minutes'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-4xl md:text-6xl font-mono font-bold text-primary">
                  {timeRemaining.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2">
                  {timeRemaining.seconds === 1 ? 'Second' : 'Seconds'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Holiday Date */}
      <Card className="w-full max-w-2xl mb-8">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {holiday.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Advertisement Section */}
      <div className="w-full max-w-4xl mb-8">
        <AdPlaceholder slot={getSlotForPlacement('holiday')} />
      </div>

      {/* Two Column Layout - Holiday Info and New Year Dates */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Holiday Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                About {holiday.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {holiday.description}
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold">Holiday Details:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Date: {holiday.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</li>
                  <li>• Type: {holiday.slug.includes('day') ? 'Annual Holiday' : 'Seasonal Celebration'}</li>
                  <li>• Celebration: Worldwide</li>
                  <li>• Traditions: Family gatherings, special meals, gift-giving</li>
                </ul>
              </div>
              {holiday.wikipediaUrl && (
                <div className="pt-4">
                  <a href={holiday.wikipediaUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Learn More on Wikipedia
                    </Button>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Holiday Dates Across Years */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {holiday.name} Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {years.map((year) => {
                  // Calculate the holiday date for this specific year
                  let holidayDate: Date;
                  const currentYear = new Date().getFullYear();
                  
                  if (holiday.slug === 'easter') {
                    holidayDate = getEasterDate(year);
                  } else if (holiday.slug === 'mothers-day') {
                    holidayDate = getMothersDay(year);
                  } else if (holiday.slug === 'fathers-day') {
                    holidayDate = getFathersDay(year);
                  } else if (holiday.slug === 'thanksgiving') {
                    holidayDate = getThanksgiving(year);
                  } else {
                    // For fixed-date holidays, use the same month/day but different year
                    const originalDate = holiday.date;
                    holidayDate = new Date(year, originalDate.getMonth(), originalDate.getDate());
                  }
                  
                  const formattedDate = holidayDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  });
                  
                  const now = new Date();
                  const status = year < currentYear ? 'Past' : 
                               year === currentYear ? (holidayDate > now ? 'Current' : 'Past') : 
                               year === currentYear + 1 ? 'Upcoming' : 'Future';
                  
                  return (
                    <Link key={year} href={`/${holiday.slug}/${year}`}>
                      <div className="flex justify-between items-center py-2 px-3 rounded hover:bg-muted cursor-pointer border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{holiday.emoji}</span>
                          <div>
                            <div className="font-medium">{holiday.name} {year}</div>
                            <div className="text-sm text-muted-foreground">{formattedDate}</div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          status === 'Current' ? 'bg-green-100 text-green-800' :
                          status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          status === 'Past' ? 'bg-gray-100 text-gray-600' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {status}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
    </div>
  );
};
