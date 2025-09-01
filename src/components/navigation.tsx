
"use client";
import { Button } from "./ui/button";
import { AlarmClock, Timer, Hourglass, Clock, MonitorPlay, Settings, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { id: "time", label: "Time", icon: Clock, href: "/" },
    { id: "alarm", label: "Alarm", icon: AlarmClock, href: "/alarm" },
    { id: "timer", label: "Timer", icon: Timer, href: "/timer" },
    { id: "stopwatch", label: "Stopwatch", icon: Hourglass, href: "/stopwatch" },
    { id: "world-clock", label: "World Clock", icon: Globe, href: "/world-clock" },
] as const;

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveTab = () => {
    if (pathname === '/') return 'time';
    if (pathname.startsWith('/alarm')) return 'alarm';
    if (pathname.startsWith('/timer')) return 'timer';
    if (pathname.startsWith('/stopwatch')) return 'stopwatch';
    if (pathname.startsWith('/world-clock')) return 'world-clock';
    return 'time';
  }

  const activeTab = getActiveTab();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 flex items-center w-full z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center relative h-full">
          {/* Left: Nav Toggle (mobile) + Logo */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button - moved to left */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary">
               <MonitorPlay className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">wklock</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 rounded-full bg-secondary/50 p-1 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Button 
                asChild 
                key={item.id} 
                variant={activeTab === item.id ? "secondary" : "ghost"} 
                className="rounded-full"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right side intentionally empty; settings toggle sits at top-right via SettingsPanel */}
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <nav className={cn(
        "fixed top-0 right-0 h-full w-72 bg-background border-l shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-bold">wklock</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                asChild
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 text-left transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-secondary text-secondary-foreground" 
                    : "hover:bg-secondary/50"
                )}
                onClick={closeMobileMenu}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground text-center">
              Online Clock, Timer & Stopwatch
            </p>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation removed in favor of sidebar toggle */}
    </>
  );
};
