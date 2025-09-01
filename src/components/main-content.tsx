
"use client";

import { ClockDisplay } from '@/components/clock-display';
import { QuoteDisplay } from '@/components/quote-display';
import { SettingsPanel } from '@/components/settings-panel';
import { Navigation } from '@/components/navigation';
import { Alarm } from '@/components/alarm';
import { Timer } from '@/components/timer';
import { Stopwatch } from '@/components/stopwatch';
import { DateDisplay } from '@/components/date-display';
import { useSettings } from '@/context/settings-context';
import { PopularTimezones } from '@/components/popular-timezones';

import { PageFooter } from '@/components/page-footer';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const MainContent = ({children}: {children?: React.ReactNode}) => {
  const { settings } = useSettings();
  const pathname = usePathname();

  const getActiveTabFromPath = () => {
    if (pathname === '/') return 'time' as const;
    if (pathname.startsWith('/alarm')) return 'alarm' as const;
    if (pathname.startsWith('/timer')) return 'timer' as const;
    if (pathname.startsWith('/stopwatch')) return 'stopwatch' as const;
    if (pathname.startsWith('/world-clock')) return 'world-clock' as const;

    return 'time' as const;
  };

  useEffect(() => {
    const originalTitle = document.title;
    const updateTitle = () => {
      const timeString = new Date().toLocaleTimeString();
      const newTitle = `${timeString} - ${originalTitle.split(' - ')[1] || 'wklock'}`;
      if (document.title !== newTitle) {
        document.title = newTitle;
      }
    };
    
    updateTitle();
    const intervalId = setInterval(updateTitle, 1000);

    return () => {
      clearInterval(intervalId);
      document.title = originalTitle;
    };
  }, []);

  const renderContent = () => {
    if (children) return children;
    const activeTab = getActiveTabFromPath();
    switch (activeTab) {
        case 'time':
            return (
                <div className="flex flex-col items-center justify-center text-center w-full px-4">
                    <h1 className="text-xl md:text-2xl text-muted-foreground mb-4">Time Now</h1>
                    <div className="w-full max-w-4xl">
                        <ClockDisplay />
                    </div>
                    <DateDisplay />
                    <QuoteDisplay />
                </div>
            );
        case 'alarm':
            return <Alarm />;
        case 'timer':
            return <Timer />;
        case 'stopwatch':
            return <Stopwatch />;
        case 'world-clock':
            return <PopularTimezones />;

        default:
            return (
                 <div className="flex flex-col items-center justify-center text-center w-full px-4">
                    <h1 className="text-xl md:text-2xl text-muted-foreground mb-4">Time Now</h1>
                    <div className="w-full max-w-4xl">
                        <ClockDisplay />
                    </div>
                    <DateDisplay />
                    <QuoteDisplay />
                </div>
            );
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
      <Navigation />
      <main className="flex-grow flex flex-col items-center justify-center overflow-hidden w-full pt-24 pb-8">
        {renderContent()}
      </main>
      
      {(getActiveTabFromPath() === 'time' || getActiveTabFromPath() === 'world-clock') && (
        <footer className="w-full max-w-7xl mx-auto mt-12 mb-16 md:mb-0">
          <AdPlaceholder slot={getSlotForPlacement('home')} />
          {getActiveTabFromPath() === 'time' && <PopularTimezones /> }
          <PageFooter />
        </footer>
      )}
      
      <SettingsPanel />
    </div>
  )
}
