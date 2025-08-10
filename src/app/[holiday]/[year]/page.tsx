import { HolidayTimerPage } from "@/components/holiday-timer-page";

interface PageProps {
  params: {
    holiday: string;
    year: string;
  };
}

export default function HolidayPage({ params }: PageProps) {
  // Combine holiday and year to match the old slug format for the component
  const holidaySlug = `${params.holiday}-${params.year}`;
  
  return <HolidayTimerPage holidaySlug={holidaySlug} />;
}
