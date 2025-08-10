
'use client'

import { MainContent } from "@/components/main-content";
import { useSettings } from "@/context/settings-context";
import { useEffect } from "react";
import { PopularTimezones } from "@/components/popular-timezones";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { getSlotForPlacement } from "@/lib/adsense";
import { SharedTimerDisplay } from "@/components/shared-timer-display";

export default function WorldClock() {
    const { setSettings } = useSettings();
    useEffect(() => {
        setSettings({ activeTab: 'world-clock' });
    }, [setSettings]);

    return (
      <MainContent>
        <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4">
          <div className="w-full text-center py-8">
            <h1 className="text-4xl font-bold mb-2">World Clock</h1>
            <p className="text-lg text-muted-foreground mb-8">Current Local Time</p>
            <SharedTimerDisplay size="large" className="mb-8" />
            <p className="text-lg text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <PopularTimezones />
        <AdPlaceholder slot={getSlotForPlacement('world')} className="max-w-7xl mx-auto my-8" />
      </MainContent>
    );
}
