

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { slugToCity } from '@/lib/city-timezones';
import { useSettings } from '@/context/settings-context';
import { MainContent } from '@/components/main-content';
import { SharedTimerDisplay } from '@/components/shared-timer-display';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';

const WorldClockPage = () => {
  const params = useParams();
  const { setSettings } = useSettings();
  const [date, setDate] = useState('');
  const [cityDetails, setCityDetails] = useState<{ name: string; country: string; timezone: string } | null>(null);

  useEffect(() => {
    setSettings({ activeTab: 'world-clock' });
  }, [setSettings]);

  useEffect(() => {
    if (params.city) {
      const city = slugToCity.get((params.city as string).toString());

      if (city) {
        setCityDetails(city);
        const updateClock = () => {
          const now = new Date();
          const dateString = now.toLocaleDateString('en-US', {
            timeZone: city.timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          setDate(dateString);
        };
        
        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, [params.city]);

  if (!cityDetails) {
    return <MainContent />;
  }

  return (
    <MainContent>
        <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4">
            <div className="w-full text-center py-8">
                <h1 className="text-4xl font-bold mb-2">{cityDetails.name}</h1>
                <p className="text-lg text-muted-foreground mb-8">{cityDetails.country}</p>
                <SharedTimerDisplay size="large" className="mb-4" timezone={cityDetails.timezone} />
                <p className="text-lg text-muted-foreground mt-4">
                    {date}
                </p>
                <AdPlaceholder slot={getSlotForPlacement('world')} className="max-w-7xl mx-auto my-8" />
            </div>
        </div>
    </MainContent>
  );
};

export default WorldClockPage;
