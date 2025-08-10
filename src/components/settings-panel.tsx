"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Cog } from "lucide-react";
import { useSettings, type ClockMode } from "@/context/settings-context";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const fontOptions = [
    { value: 'font-body', label: 'Inter' },
    { value: 'font-mono', label: 'Roboto Mono' },
    { value: 'font-orbitron', label: 'Orbitron' },
    { value: 'font-press-start', label: 'Press Start 2P' },
    { value: 'font-digital', label: 'Share Tech Mono (Digital)' },
]

export const SettingsPanel = () => {
  const { settings, setSettings } = useSettings();

  const handleBackgroundColorChange = (color: string) => {
    setSettings({ backgroundColor: color });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
          aria-label="Open settings"
        >
          <Cog className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your clock experience. Changes are saved automatically.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="clock-mode">Clock Mode</Label>
            <RadioGroup
              id="clock-mode"
              value={settings.mode}
              onValueChange={(value: string) => setSettings({ mode: value as ClockMode })}
              className="flex space-x-2"
            >
              <div>
                <RadioGroupItem value="digital" id="digital" className="peer sr-only" />
                <Label htmlFor="digital" className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Digital</Label>
              </div>
              <div>
                <RadioGroupItem value="analog" id="analog" className="peer sr-only" />
                <Label htmlFor="analog" className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Analog</Label>
              </div>
              <div>
                <RadioGroupItem value="text" id="text" className="peer sr-only" />
                <Label htmlFor="text" className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Text</Label>
              </div>
            </RadioGroup>
          </div>
           <div className="grid gap-3">
             <Label htmlFor="font-family">Font Family</Label>
             <Select value={settings.fontFamily} onValueChange={(value) => setSettings({ fontFamily: value })}>
                <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                    {fontOptions.map(font => (
                        <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
           </div>
          <div className="grid gap-3">
            <Label htmlFor="clock-color">Color</Label>
            <div className="relative">
              <Input
                id="clock-color"
                type="color"
                value={settings.color}
                onChange={(e) => setSettings({ color: e.target.value })}
                className="h-12 w-full p-1"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm uppercase text-muted-foreground">{settings.color}</span>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="background-color">Background Color</Label>
            <div className="relative">
              <Input
                id="background-color"
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="h-12 w-full p-1"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-sm uppercase text-muted-foreground">{settings.backgroundColor}</span>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="clock-size">Size ({settings.size}%)</Label>
            <Slider
              id="clock-size"
              min={50}
              max={250}
              step={10}
              value={[settings.size]}
              onValueChange={(value) => setSettings({ size: value[0] })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-seconds">Show Seconds</Label>
            <Switch
              id="show-seconds"
              checked={settings.showSeconds}
              onCheckedChange={(checked) => setSettings({ showSeconds: checked })}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
