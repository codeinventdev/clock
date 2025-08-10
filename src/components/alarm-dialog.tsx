"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Loader } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
// Use API route to avoid direct server function calls from client

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const sounds = [
    "Alarm", "Beep", "Bell", "Buzzer", "Chime", "Cuckoo", 
    "Digital", "Doorbell", "Echo", "Electronic", "Fantasy", 
    "Harp", "Music", "Piano", "Siren", "Xylophone"
];


export interface Alarm {
    id: string;
    hour: number;
    minute: number;
    period: 'AM' | 'PM';
    sound: string;
    repeat: boolean;
    title: string;
    enabled: boolean;
}

interface AlarmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (alarm: Alarm) => void;
    alarm: Alarm | null;
}

export const AlarmDialog = ({ open, onOpenChange, onSave, alarm }: AlarmDialogProps) => {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('PM');
  const [sound, setSound] = useState('Alarm');
  const [repeat, setRepeat] = useState(false);
  const [title, setTitle] = useState('Alarm');
  const [isGenerating, setIsGenerating] = useState(false);
  const stopPreviewRef = useRef<null | (() => void)>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (alarm) {
        setHour(alarm.hour);
        setMinute(alarm.minute);
        setPeriod(alarm.period);
        setSound(alarm.sound);
        setRepeat(alarm.repeat);
        setTitle(alarm.title);
    } else {
        // Reset to default for new alarm
        setHour(7);
        setMinute(0);
        setPeriod('PM');
        setSound('Alarm');
        setRepeat(false);
        setTitle('Alarm');
    }
  }, [alarm, open]);

  useEffect(() => {
    return () => {
      if (stopPreviewRef.current) stopPreviewRef.current();
    };
  }, []);
  
  const handlePlaySound = async () => {
    setIsGenerating(true);
    try {
        if (stopPreviewRef.current) stopPreviewRef.current();
        const { playNamedSound } = await import('@/lib/sounds');
        stopPreviewRef.current = await playNamedSound(sound, { loop: false });
    } catch(e) {
        toast({
          title: "Error playing sound",
          description: "Could not play the selected sound.",
          variant: "destructive"
        })
    } finally {
        setIsGenerating(false);
    }
  }
  
  const handleStart = () => {
    const newAlarm: Alarm = {
        id: alarm ? alarm.id : new Date().toISOString(),
        hour,
        minute,
        period,
        sound,
        repeat,
        title,
        enabled: alarm ? alarm.enabled : true,
    }
    onSave(newAlarm);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{alarm ? 'Edit Alarm' : 'Add Alarm'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="hours">Hour</Label>
              <Select value={String(hour)} onValueChange={(val) => setHour(Number(val))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {hours.map(h => <SelectItem key={h} value={String(h)}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minutes">Minute</Label>
              <Select value={String(minute)} onValueChange={(val) => setMinute(Number(val))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {minutes.map(m => <SelectItem key={m} value={String(m)}>{String(m).padStart(2,'0')}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Select value={period} onValueChange={(val: 'AM' | 'PM') => setPeriod(val)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sound">Sound</Label>
            <div className="flex items-center gap-2">
                <Select value={sound} onValueChange={setSound}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sounds.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handlePlaySound} disabled={isGenerating}>
                    {isGenerating ? <Loader className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                </Button>
            </div>
            {isGenerating && <p className="text-sm text-muted-foreground">Generating sound...</p>}
          </div>
           <div className="flex items-center space-x-2">
            <Checkbox id="repeat" checked={repeat} onCheckedChange={(checked) => setRepeat(Boolean(checked))} />
            <Label htmlFor="repeat">Repeat sound</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleStart}>Start</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
