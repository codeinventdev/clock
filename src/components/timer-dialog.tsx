
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Loader, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
// Use API route to avoid direct server function calls from client

const sounds = [
    "Alarm", "Beep", "Bell", "Buzzer", "Chime", "Cuckoo", 
    "Digital", "Doorbell", "Echo", "Electronic", "Fantasy", 
    "Harp", "Music", "Piano", "Siren", "Xylophone"
];

export interface Timer {
    id: string;
    hours: number;
    minutes: number;
    seconds: number;
    onZero: 'stop' | 'restart' | 'stopwatch';
    sound: string;
    repeat: boolean;
    title: string;
    showMessage: boolean;
    remainingTime: number;
    isRunning: boolean;
    isPaused: boolean;
    initialDuration: number;
}

interface TimerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (timer: Omit<Timer, 'remainingTime' | 'isRunning' | 'isPaused' | 'initialDuration'>, andStart: boolean) => void;
    timer: Omit<Timer, 'remainingTime' | 'isRunning' | 'isPaused' | 'initialDuration'> | null;
}

const NumberInput = ({ value, onChange, min, max, label }: { value: number, onChange: (val: number) => void, min: number, max: number, label: string }) => {
    const increment = () => onChange(Math.min(max, value + 1));
    const decrement = () => onChange(Math.max(min, value - 1));

    return (
        <div className="grid gap-2 text-center">
            <Label>{label}</Label>
            <div className="flex items-center justify-center gap-2">
                <Input type="number" value={String(value).padStart(2, '0')} onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)} className="text-center w-16" />
                <div className="flex flex-col">
                    <Button variant="outline" size="icon" onClick={increment} className="h-6 w-6"><ChevronUp className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={decrement} className="h-6 w-6"><ChevronDown className="h-4 w-4" /></Button>
                </div>
            </div>
        </div>
    )
}


export const TimerDialog = ({ open, onOpenChange, onSave, timer }: TimerDialogProps) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [onZero, setOnZero] = useState<'stop' | 'restart' | 'stopwatch'>('stop');
  const [sound, setSound] = useState('Xylophone');
  const [repeat, setRepeat] = useState(true);
  const [title, setTitle] = useState('Timer');
  const [showMessage, setShowMessage] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const stopPreviewRef = useRef<null | (() => void)>(null);

  const { toast } = useToast();
  useEffect(() => {
    return () => {
      if (stopPreviewRef.current) stopPreviewRef.current();
    };
  }, []);

  useEffect(() => {
    if (timer) {
        setHours(timer.hours);
        setMinutes(timer.minutes);
        setSeconds(timer.seconds);
        setOnZero(timer.onZero);
        setSound(timer.sound);
        setRepeat(timer.repeat);
        setTitle(timer.title);
        setShowMessage(timer.showMessage);
    } else {
        setHours(0);
        setMinutes(0);
        setSeconds(30);
        setOnZero('stop');
        setSound('Xylophone');
        setRepeat(true);
        setTitle('Timer');
        setShowMessage(true);
    }
  }, [timer, open]);
  
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
    const newTimer = {
        id: timer ? timer.id : new Date().toISOString(),
        hours,
        minutes,
        seconds,
        onZero,
        sound,
        repeat,
        title,
        showMessage,
    }
    onSave(newTimer, true);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{timer ? 'Edit Timer' : 'Add Timer'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="countdown" className="flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="countdown" id="countdown" />
                    <Label htmlFor="countdown">Countdown</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="count_till" id="count_till" disabled />
                    <Label htmlFor="count_till" className="text-muted-foreground">Count till (from) date and time</Label>
                </div>
            </RadioGroup>

            <div className="grid grid-cols-3 gap-2">
                <NumberInput label="Hours" value={hours} onChange={setHours} min={0} max={23} />
                <NumberInput label="Minutes" value={minutes} onChange={setMinutes} min={0} max={59} />
                <NumberInput label="Seconds" value={seconds} onChange={setSeconds} min={0} max={59} />
            </div>

            <div>
                <Label>On zero</Label>
                <RadioGroup value={onZero} onValueChange={(val: any) => setOnZero(val)} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stop" id="stop" />
                        <Label htmlFor="stop">Stop timer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="restart" id="restart" />
                        <Label htmlFor="restart">Restart timer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stopwatch" id="stopwatch" />
                        <Label htmlFor="stopwatch">Run as stopwatch</Label>
                    </div>
                </RadioGroup>
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
                    {/* WebAudio-based preview; no <audio> element needed */}
                    <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="repeat" checked={repeat} onCheckedChange={(checked) => setRepeat(Boolean(checked))} />
                        <Label htmlFor="repeat">Repeat sound</Label>
                    </div>
                </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="show-message" checked={showMessage} onCheckedChange={(checked) => setShowMessage(Boolean(checked))} />
            <Label htmlFor="show-message">Show message</Label>
          </div>
        </div>

        <DialogFooter className="justify-between">
            <Button variant="ghost">Test</Button>
            <div className="flex gap-2">
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={handleStart}>Start</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
