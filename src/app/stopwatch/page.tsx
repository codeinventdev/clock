
'use client'

import { MainContent } from "@/components/main-content";
import { useSettings } from "@/context/settings-context";
import { useEffect } from "react";
import { Stopwatch } from "@/components/stopwatch";

export default function StopwatchPage() {
    const { setSettings } = useSettings();
    useEffect(() => {
        setSettings({ activeTab: 'stopwatch' });
    }, [setSettings]);

    return (
      <MainContent>
        <Stopwatch />
      </MainContent>
    );
}
