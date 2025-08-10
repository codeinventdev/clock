"use client";
import { useState, useEffect, useRef } from "react";
import { TimerDialog, type Timer as TimerType } from "./timer-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Play, Pause, RotateCcw, Trash2, Timer as TimerIcon, Plus, Edit, Clock, Calendar } from "lucide-react";
import { Separator } from "./ui/separator";
import { TimerFooter } from "./timer-footer";
import { AdPlaceholder } from "./ad-placeholder";
import { getSlotForPlacement } from "@/lib/adsense";
import { HolidayCountdown } from './holiday-countdown';
import { usePathname } from 'next/navigation';
import { SharedTimerDisplay } from "./shared-timer-display";

const formatTime = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      totalSeconds = 0;
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


const presetTimers = [
  { label: '1 Minute Timer', duration: 60 },
  { label: '10 Second Timer', duration: 10 },
  { label: '3 Minute Timer', duration: 180 },
  { label: '20 Second Timer', duration: 20 },
  { label: '5 Minute Timer', duration: 300 },
  { label: '30 Second Timer', duration: 30 },
  { label: '10 Minute Timer', duration: 600 },
  { label: '45 Second Timer', duration: 45 },
  { label: '15 Minute Timer', duration: 900 },
  { label: '60 Second Timer', duration: 60 },
  { label: '20 Minute Timer', duration: 1200 },
  { label: '90 Second Timer', duration: 90 },
  { label: '30 Minute Timer', duration: 1800 },
  { label: '1 Hour Timer', duration: 3600 },
  { label: '45 Minute Timer', duration: 2700 },
  { label: '2 Hour Timer', duration: 7200 },
  { label: '60 Minute Timer', duration: 3600 },
  { label: '4 Hour Timer', duration: 14400 },
  { label: '8 Hour Timer', duration: 28800 },
];


export const Timer = () => {
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [editingTimer, setEditingTimer] = useState<TimerType | null>(null);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const stopMapRef = useRef<Map<string, () => void>>(new Map());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const allAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set());
  const allStopFunctionsRef = useRef<Set<() => void>>(new Set());
  const timerLockRef = useRef<Set<string>>(new Set()); // Prevent multiple intervals per timer


  useEffect(() => {
    try {
      const storedTimers = localStorage.getItem("time-weaver-timers");
      if (storedTimers) {
        const parsedTimers = JSON.parse(storedTimers) as Omit<TimerType, 'remainingTime' | 'isRunning' | 'isPaused'>[];
        const updatedTimers = parsedTimers.map(t => {
            const initialDuration = t.initialDuration || (t.hours * 3600 + t.minutes * 60 + t.seconds);
            return {
                ...t, 
                isRunning: false, 
                isPaused: false,
                remainingTime: initialDuration,
                initialDuration,
            }
        });
        setTimers(updatedTimers);
      }
    } catch (error) {
      console.error("Failed to parse timers from localStorage", error);
    }
    
    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, []);



  const saveTimers = (newTimers: TimerType[]) => {
    setTimers(newTimers);
    try {
      const timersToStore = newTimers.map(({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }) => ({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }));
      localStorage.setItem("time-weaver-timers", JSON.stringify(timersToStore));
    } catch (error) {
      console.error("Failed to save timers to localStorage", error);
    }
  };
  
  const playSound = async (timer: TimerType) => {
    try {
      const { playNamedSound } = await import('@/lib/sounds');
      
      // Stop any existing sound for this timer first
      const existing = stopMapRef.current.get(timer.id);
      if (existing) {
        existing();
        allStopFunctionsRef.current.delete(existing);
      }
      
      // Play new sound
      const stop = await playNamedSound(timer.sound || 'Alarm', { loop: timer.repeat });
      
      // Store the stop function in multiple places for reliability
      stopMapRef.current.set(timer.id, stop);
      allStopFunctionsRef.current.add(stop);
      
      console.log(`Started sound for timer ${timer.id}`);
    } catch (e) {
      console.error('Failed to play timer sound', e);
    }
  }

  const handleTimerEnd = (timer: TimerType) => {
      playSound(timer);
      
      if (timer.onZero === 'restart') {
        setTimeout(() => startTimer(timer.id, true), 1000);
      }
  };

  const handleTimerTick = (id: string) => {
    // Additional safety check - if interval was cleared, don't proceed
    if (!intervalRefs.current[id]) {
      console.log(`Timer ${id} tick called but interval was cleared`);
      return;
    }
    
    setTimers(prev => {
        const timerIndex = prev.findIndex(t => t.id === id);
        if (timerIndex === -1) {
            // Timer was deleted, clear interval and exit
            console.log(`Timer ${id} not found, clearing interval`);
            if (intervalRefs.current[id]) {
              clearInterval(intervalRefs.current[id]);
              delete intervalRefs.current[id];
            }
            return prev;
        }
        
        const timer = prev[timerIndex];
        if (!timer.isRunning || timer.isPaused) {
            console.log(`Timer ${id} not running or paused, clearing interval`);
            if (intervalRefs.current[id]) {
              clearInterval(intervalRefs.current[id]);
              delete intervalRefs.current[id];
            }
            return prev;
        }

        const newRemainingTime = timer.remainingTime - 1;
        console.log(`Timer ${id}: ${timer.remainingTime} -> ${newRemainingTime}`);
        
        if (newRemainingTime <= 0) {
            if (intervalRefs.current[id]) {
              clearInterval(intervalRefs.current[id]);
              delete intervalRefs.current[id];
            }
            
            const newTimers = [...prev];
            const finishedTimer = { ...timer, remainingTime: 0, isRunning: false };
            newTimers[timerIndex] = finishedTimer;
            
            handleTimerEnd(finishedTimer);
            return newTimers;
        }
        
        const newTimers = [...prev];
        newTimers[timerIndex] = { ...timer, remainingTime: newRemainingTime };
        return newTimers;
    });
  };

  const startTimer = async (id: string, fromRestart = false) => {
    console.log(`Starting timer ${id}, fromRestart: ${fromRestart}`);
    
    // Check if timer is already locked (interval creation in progress)
    if (timerLockRef.current.has(id)) {
      console.log(`Timer ${id} is locked, skipping start`);
      return;
    }
    
    // Lock the timer to prevent multiple intervals
    timerLockRef.current.add(id);
    
    try {
      // ALWAYS clear any existing interval first to prevent double intervals
      if (intervalRefs.current[id]) {
        console.log(`Clearing existing interval for timer ${id}`);
        clearInterval(intervalRefs.current[id]);
        delete intervalRefs.current[id];
      }

      if(fromRestart) {
          const stopper = stopMapRef.current.get(id);
          if (stopper) stopper();
      }
      
      let timerToStart: TimerType | undefined;
      
      setTimers(prev => {
        const newTimers = prev.map(t => {
          if (t.id === id) {
            const wasPaused = t.isPaused;
            const initialDuration = t.initialDuration || (t.hours * 3600 + t.minutes * 60 + t.seconds);
            const remainingTime = fromRestart ? initialDuration : (wasPaused ? t.remainingTime : initialDuration);
            
            timerToStart = { ...t, isRunning: true, isPaused: false, remainingTime, initialDuration };
            
            // Only create interval if timer has remaining time AND no interval exists
            if (remainingTime > 0 && !intervalRefs.current[id]) {
              console.log(`Creating new interval for timer ${id} with ${remainingTime} seconds remaining`);
              intervalRefs.current[id] = setInterval(() => {
                console.log(`Timer ${id} tick`);
                handleTimerTick(id);
              }, 1000);
            }
            return timerToStart;
          }
          return t;
        });
        return newTimers;
      });
    } finally {
      // Always unlock the timer after processing
      timerLockRef.current.delete(id);
    }

    // No pre-generation needed with WebAudio
  };

  const pauseTimer = (id: string) => {
    clearInterval(intervalRefs.current[id]);
    delete intervalRefs.current[id];
    setTimers(prev => prev.map(t => t.id === id ? { ...t, isRunning: false, isPaused: true } : t));
  };
  
  const resetTimer = (id: string) => {
    clearInterval(intervalRefs.current[id]);
    delete intervalRefs.current[id];
    const stopper = stopMapRef.current.get(id);
    if (stopper) {
        stopper();
        stopMapRef.current.delete(id);
    }
    const timer = timers.find(t => t.id === id);
    if(timer) {
        startTimer(timer.id, true);
    }
  };

  const stopAllSounds = () => {
    console.log('Stopping all sounds - foolproof method');
    
    // Method 1: Stop via stored stop functions
    stopMapRef.current.forEach((stopFn, timerId) => {
      try {
        console.log(`Stopping sound for timer ${timerId}`);
        stopFn();
      } catch (e) {
        console.error(`Failed to stop sound for timer ${timerId}:`, e);
      }
    });
    stopMapRef.current.clear();
    
    // Method 2: Stop all stored stop functions
    allStopFunctionsRef.current.forEach((stopFn) => {
      try {
        stopFn();
      } catch (e) {
        console.error('Failed to stop sound function:', e);
      }
    });
    allStopFunctionsRef.current.clear();
    
    // Method 3: Stop all Audio elements
    allAudioElementsRef.current.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
      } catch (e) {
        console.error('Failed to stop audio element:', e);
      }
    });
    allAudioElementsRef.current.clear();
    
    // Method 4: Find and stop all audio elements in the DOM
    try {
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    } catch (e) {
      console.error('Failed to stop DOM audio elements:', e);
    }
    
    // Method 5: Close and recreate AudioContext if it exists
    try {
      if (window.AudioContext || (window as any).webkitAudioContext) {
        // This will stop all WebAudio sounds
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      }
    } catch (e) {
      console.error('Failed to close AudioContext:', e);
    }
    
    console.log('All sound stopping methods executed');
  };

  const deleteTimer = (id: string) => {
    console.log(`Deleting timer ${id}`);
    
    // Remove timer lock if it exists
    timerLockRef.current.delete(id);
    
    // Clear interval first to stop any ongoing ticks
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    
    // Stop ALL sounds using foolproof method
    stopAllSounds();
    
    // Update state to remove the timer
    setTimers(prev => {
      const newTimers = prev.filter(t => t.id !== id);
      // Save to localStorage
      try {
        const timersToStore = newTimers.map(({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }) => ({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }));
        localStorage.setItem("time-weaver-timers", JSON.stringify(timersToStore));
      } catch (error) {
        console.error("Failed to save timers to localStorage", error);
      }
      return newTimers;
    });
  };

  const handleFinishedTimerOK = (id: string) => {
    console.log(`OK button clicked for timer ${id}`);
    
    // Use foolproof method to stop ALL sounds
    stopAllSounds();
    
    // Remove the timer
    setTimers(prev => {
      const newTimers = prev.filter(timer => timer.id !== id);
      // Save to localStorage
      try {
        const timersToStore = newTimers.map(({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }) => ({ id, hours, minutes, seconds, onZero, sound, repeat, title, showMessage, initialDuration }));
        localStorage.setItem("time-weaver-timers", JSON.stringify(timersToStore));
      } catch (error) {
        console.error("Failed to save timers to localStorage", error);
      }
      return newTimers;
    });
  };

  const handleEditTimer = (timer: TimerType) => {
    pauseTimer(timer.id);
    setEditingTimer(timer);
    setIsDialogOpen(true);
  };
  
  const handleSaveTimer = (timerData: Omit<TimerType, 'remainingTime' | 'isRunning' | 'isPaused' | 'initialDuration'>, andStart = false) => {
    const totalSeconds = timerData.hours * 3600 + timerData.minutes * 60 + timerData.seconds;
    
    const newTimer: TimerType = {
        ...timerData,
        remainingTime: totalSeconds,
        isRunning: false,
        isPaused: false,
        initialDuration: totalSeconds,
    };
    
    let newTimers;
    const existingIndex = timers.findIndex(t => t.id === newTimer.id);

    if (existingIndex > -1) {
        newTimers = [...timers];
        const existingTimer = newTimers[existingIndex];
        newTimers[existingIndex] = {
            ...existingTimer,
            ...timerData,
            initialDuration: totalSeconds,
            remainingTime: totalSeconds,
            isRunning: false,
            isPaused: false,
        };
        const stopper = stopMapRef.current.get(newTimer.id);
        if (stopper) {
          stopper();
          stopMapRef.current.delete(newTimer.id);
        }
    } else {
      newTimers = [...timers, newTimer];
    }
    saveTimers(newTimers);
    setEditingTimer(null);

    if (andStart) {
        startTimer(newTimer.id);
    }
  };

  const handleAddTimerClick = () => {
    setEditingTimer(null);
    setIsDialogOpen(true);
  }

  const handlePresetClick = (duration: number, title: string) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timerData = {
      id: new Date().toISOString(),
      hours,
      minutes,
      seconds,
      onZero: 'stop' as const,
      sound: 'Xylophone',
      repeat: true,
      title,
      showMessage: true,
    }
    handleSaveTimer(timerData, true);
  }

  if (!pathname.startsWith('/timer')) {
    return null;
  }

  return (
    <div className="flex flex-col text-foreground w-full max-w-7xl mx-auto p-4">
      {/* Main Timer Display - Large centered with current time */}
      <div className="flex flex-col items-center justify-center mb-6 border-b pb-6">
        <div className="w-full max-w-4xl">
          <SharedTimerDisplay size="large" className="mb-6" />
        </div>
        
        {/* Set Timer Button */}
        <Button 
          onClick={() => setIsDialogOpen(true)}
          size="lg" 
          className="px-8 py-3 text-lg font-semibold"
        >
          Set Timer
        </Button>
      </div>

      {/* Running Timers Section - Above Advertisement */}
      <div className="mb-6 border-b pb-6">
        {timers.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground text-lg">No timers running.</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timers.map((timer) => {
              const isFinished = timer.remainingTime <= 0 && !timer.isRunning && !timer.isPaused;
              return (
                <Card key={timer.id} className={`flex flex-col ${isFinished ? 'border-green-500' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl">{timer.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditTimer(timer)}>
                          <Edit className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTimer(timer.id)}>
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center flex-grow">
                    <div className="text-4xl md:text-6xl font-mono mb-4">
                      {isFinished ? "Finished!" : formatTime(timer.remainingTime)}
                    </div>
                    <Progress 
                      value={isFinished ? 100 : timer.initialDuration > 0 ? ((timer.initialDuration - timer.remainingTime) / timer.initialDuration) * 100 : 0} 
                      className={`w-full ${isFinished ? '[&>div]:bg-green-500' : ''}`} 
                    />
                    <div className="flex gap-2 mt-4">
                      {isFinished ? (
                        <>
                          <Button variant="outline" onClick={() => handleFinishedTimerOK(timer.id)}>OK</Button>
                          <Button variant="default" onClick={() => resetTimer(timer.id)}>Restart</Button>
                        </>
                      ) : timer.isRunning ? (
                        <Button variant="default" size="icon" onClick={() => pauseTimer(timer.id)}>
                          <Pause className="h-4 w-4"/>
                        </Button>
                      ) : (
                        <Button variant="default" size="icon" onClick={() => startTimer(timer.id)}>
                          <Play className="h-4 w-4"/>
                        </Button>
                      )}
                      {!isFinished && (
                        <Button variant="outline" size="icon" onClick={() => resetTimer(timer.id)}>
                          <RotateCcw className="h-4 w-4"/>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Advertisement Section */}
      <div className="mb-6 border-b pb-6">
        <AdPlaceholder slot={getSlotForPlacement('timer')} />
      </div>

      {/* Two Column Layout - Timer Presets and Recently Used */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 border-b pb-6">
        {/* Left Column - Timer Presets */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Set the timer for the specified time</h2>
          <div className="grid grid-cols-2 gap-2">
            {/* Left Column Timers */}
            <div className="space-y-0">
              {[
                { label: "1 Minute Timer", duration: 60 },
                { label: "3 Minute Timer", duration: 180 },
                { label: "5 Minute Timer", duration: 300 },
                { label: "10 Minute Timer", duration: 600 },
                { label: "15 Minute Timer", duration: 900 },
                { label: "20 Minute Timer", duration: 1200 },
                { label: "30 Minute Timer", duration: 1800 },
                { label: "40 Minute Timer", duration: 2400 },
                { label: "45 Minute Timer", duration: 2700 },
                { label: "60 Minute Timer", duration: 3600 },
              ].map((preset, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="w-full justify-start text-blue-500 hover:text-blue-600 py-1 h-auto"
                  onClick={() => handlePresetClick(preset.duration, preset.label)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            
            {/* Right Column Timers */}
            <div className="space-y-0">
              {[
                { label: "10 Second Timer", duration: 10 },
                { label: "20 Second Timer", duration: 20 },
                { label: "30 Second Timer", duration: 30 },
                { label: "45 Second Timer", duration: 45 },
                { label: "60 Second Timer", duration: 60 },
                { label: "90 Second Timer", duration: 90 },
                { label: "1 Hour Timer", duration: 3600 },
                { label: "2 Hour Timer", duration: 7200 },
                { label: "4 Hour Timer", duration: 14400 },
                { label: "8 Hour Timer", duration: 28800 },
              ].map((preset, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="w-full justify-start text-blue-500 hover:text-blue-600 py-1 h-auto"
                  onClick={() => handlePresetClick(preset.duration, preset.label)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recently Used */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recently used</h2>
          <div className="space-y-2">
            {timers.length > 0 ? (
              timers.slice(0, 10).map((timer) => (
                <div key={timer.id} className="flex justify-between items-center py-2 px-3 rounded hover:bg-muted">
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    {timer.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatTime(timer.initialDuration)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent timers</p>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout - How to Use and Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 border-b pb-6">
        {/* Left Column - How to Use the Online Timer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              How to use the online timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">1.</span>
                <span>Set the hour, minute and second for the online countdown timer, and start it. Alternatively, you can set the date and time to count down to (or up from) and the timer will start automatically.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">2.</span>
                <span>When the timer reaches zero, a sound will play to alert you that time has expired. The timer will continue to run past zero, and the sound will repeat to ensure you notice the alarm.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">3.</span>
                <span>You can also use links to online timers with different time settings for different events or holidays. Opening such a link will start the timer for the specified time.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">4.</span>
                <span>In the holiday list, you can launch a countdown timer for any holiday on the list, or you can create a new timer for your own event or holiday. Make sure to share your timer with your friends.</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Holidays */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Holidays
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Click any holiday to start a countdown timer
            </p>
          </CardHeader>
          <CardContent>
            <HolidayCountdown />
          </CardContent>
        </Card>
      </div>

      <TimerFooter />
      
      <TimerDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSaveTimer}
        timer={editingTimer}
      />
    </div>
  );
};
