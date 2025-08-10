'use client'

import { HolidayTimerPage } from '@/components/holiday-timer-page';
import { useSettings } from '@/context/settings-context';
import { useEffect } from 'react';

interface HolidayPageProps {
  params: {
    holiday: string;
  };
}

export default function HolidayPage({ params }: HolidayPageProps) {
  const { setSettings } = useSettings();
  
  useEffect(() => {
    setSettings({ activeTab: 'timer' });
  }, [setSettings]);
  
  return <HolidayTimerPage holidaySlug={params.holiday} />;
}
