
'use client'

import { MainContent } from "@/components/main-content";
import { useSettings } from "@/context/settings-context";
import { useEffect } from "react";
import { Alarm } from "@/components/alarm";

export default function AlarmPage() {
  const { setSettings } = useSettings();
  useEffect(() => {
    setSettings({ activeTab: 'alarm' });
  }, [setSettings]);
  return (
    <MainContent>
      <Alarm />
    </MainContent>
  );
}
