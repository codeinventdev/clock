
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
        <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4 pb-4">
          <div className="w-full text-center py-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">World Clock</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8">Current Local Time</p>
            <div className="w-full max-w-4xl mx-auto mb-8">
              <SharedTimerDisplay size="large" className="" />
            </div>
            <p className="text-base md:text-lg text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <PopularTimezones />
          <AdPlaceholder slot={getSlotForPlacement('world')} className="max-w-7xl mx-auto my-8" />
        </div>
      </MainContent>
    );
}
