
'use client'

import { MainContent } from '@/components/main-content';
import type { Metadata } from 'next';
import { useSettings } from '@/context/settings-context';
import { useEffect } from 'react';

// This is a workaround to conditionally set metadata on the client
if (typeof window !== 'undefined') {
    document.title = 'Online Clock - wklock';
}

export default function Home() {
  const { setSettings } = useSettings();
  useEffect(() => {
    setSettings({ activeTab: 'time' });
  }, [setSettings]);
  return <MainContent />;
}
