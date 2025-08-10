"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { hexToHsl } from "@/lib/utils";

export type ClockMode = "digital" | "analog" | "text";
export type ActiveTab = "time" | "alarm" | "timer" | "stopwatch" | "world-clock";

interface Settings {
  mode: ClockMode;
  color: string;
  size: number;
  showSeconds: boolean;
  backgroundColor: string;
  activeTab: ActiveTab;
  fontFamily: string;
}

interface SettingsContextType {
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  mode: "digital",
  color: "#FFFFFF",
  size: 100,
  showSeconds: true,
  backgroundColor: "#0F2D2E",
  activeTab: "time",
  fontFamily: 'font-body'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("time-weaver-settings");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        // Ensure activeTab is one of the valid values, otherwise default to alarm
        const validTabs: ActiveTab[] = ["time", "alarm", "timer", "stopwatch", "world-clock"];
        if (!validTabs.includes(parsedSettings.activeTab)) {
          parsedSettings.activeTab = "time";
        }
        setSettingsState(parsedSettings);
        if (parsedSettings.backgroundColor) {
          const hslColor = hexToHsl(parsedSettings.backgroundColor);
          if (hslColor) {
            document.documentElement.style.setProperty('--background', `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`);
          }
        }
        
        // Font family is now applied only to clock components
        
        // Clock color is now applied only to clock components via useSettings hook
      } else {
         const hslColor = hexToHsl(defaultSettings.backgroundColor);
         if (hslColor) {
            document.documentElement.style.setProperty('--background', `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`);
         }
         
         // Font family is now applied only to clock components
         
         // Clock color is now applied only to clock components via useSettings hook
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  const setSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettingsState(prevSettings => {
      // Avoid unnecessary updates to prevent render loops
      let hasChange = false;
      for (const key in newSettings) {
        const typedKey = key as keyof Settings;
        if (prevSettings[typedKey] !== newSettings[typedKey]) {
          hasChange = true;
          break;
        }
      }
      if (!hasChange) {
        return prevSettings;
      }

      const updatedSettings = { ...prevSettings, ...newSettings };

      if (isInitialized) {
        try {
          localStorage.setItem("time-weaver-settings", JSON.stringify(updatedSettings));
          
          // Apply background color globally
          if (newSettings.backgroundColor) {
            const hslColor = hexToHsl(newSettings.backgroundColor);
            if (hslColor) {
              document.documentElement.style.setProperty('--background', `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`);
            }
          }
          
          // Font family is now applied only to clock components
          
          // Clock color is now applied only to clock components via useSettings hook
        } catch (error) {
          console.error("Failed to save settings to localStorage", error);
        }
      }
      return updatedSettings;
    });
  }, [isInitialized]);

  const value = useMemo(() => ({ settings, setSettings }), [settings, setSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
