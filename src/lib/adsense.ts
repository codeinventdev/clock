export const ADS_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

export const SLOTS = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || '',
  world: process.env.NEXT_PUBLIC_ADSENSE_SLOT_WORLD || '',
  alarm: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ALARM || '',
  timer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TIMER || '',
  stopwatch: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STOPWATCH || '',
  holiday: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOLIDAY || '',
};

export type AdPlacement = keyof typeof SLOTS;

export const getSlotForPlacement = (placement: AdPlacement): string => SLOTS[placement] || '';


