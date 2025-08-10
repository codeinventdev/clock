
"use client";
import { Button } from "./ui/button";
import { AlarmClock, Timer, Hourglass, Clock, MonitorPlay, Settings, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { id: "time", label: "Time", icon: Clock, href: "/" },
    { id: "alarm", label: "Alarm", icon: AlarmClock, href: "/alarm" },
    { id: "timer", label: "Timer", icon: Timer, href: "/timer" },
    { id: "stopwatch", label: "Stopwatch", icon: Hourglass, href: "/stopwatch" },
    { id: "world-clock", label: "World Clock", icon: Globe, href: "/world-clock" },

] as const;

export const Navigation = () => {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/') return 'time';
    if (pathname.startsWith('/alarm')) return 'alarm';
    if (pathname.startsWith('/timer')) return 'timer';
    if (pathname.startsWith('/stopwatch')) return 'stopwatch';
    if (pathname.startsWith('/world-clock')) return 'world-clock';

    return 'time';
  }

  const activeTab = getActiveTab();

  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex items-center w-full max-w-7xl mx-auto">
       <div className="flex items-center gap-2">
         <Button variant="ghost" size="icon" className="h-10 w-10 text-primary">
            <MonitorPlay className="h-6 w-6" />
         </Button>
         <h1 className="text-xl font-bold text-foreground">wklock</h1>
      </div>
      <nav className="hidden md:flex items-center gap-2 rounded-full bg-secondary/50 p-1 absolute left-1/2 transform -translate-x-1/2">
        {navItems.map((item) => (
          <Button asChild key={item.id} variant={activeTab === item.id ? "secondary" : "ghost"} className="rounded-full">
            <Link href={item.href}>
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-2 ml-auto">
         {/* SettingsPanel is triggered from here but its content is a Sheet, which is a portal */}
      </div>
    </header>
  );
};
