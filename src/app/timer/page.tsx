
'use client'

import { MainContent } from "@/components/main-content";
import { useSettings } from "@/context/settings-context";
import { useEffect } from "react";
import { Timer } from "@/components/timer";

export default function TimerPage() {
    const { setSettings } = useSettings();
    useEffect(() => {
        setSettings({ activeTab: 'timer' });
    }, [setSettings]);

    return (
      <MainContent>
        <Timer />
      </MainContent>
    );
}
