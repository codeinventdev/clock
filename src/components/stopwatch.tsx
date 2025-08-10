
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { StopwatchFooter } from "./stopwatch-footer";
import { AdPlaceholder } from "./ad-placeholder";
import { getSlotForPlacement } from "@/lib/adsense";
import { usePathname } from 'next/navigation';
import { useSettings } from "@/context/settings-context";
import { cn } from "@/lib/utils";
import { AnalogClock } from "./clocks/analog-clock";
import { TextClock } from "./clocks/text-clock";

const formatTime = (time: number) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
};

interface Lap {
    lap: number;
    lapTime: number;
    totalTime: number;
}

interface StopwatchDisplayProps {
    time: number;
}

const StopwatchDisplay = ({ time }: StopwatchDisplayProps) => {
    const { settings } = useSettings();
    
    // Convert milliseconds to a Date object for analog/text display
    const displayTime = new Date(time);
    
    // For analog mode - let AnalogClock handle its own responsive sizing
    if (settings.mode === "analog") {
        return (
            <div className="flex justify-center">
                <AnalogClock time={displayTime} />
            </div>
        );
    }

    // For text mode - but this might not make much sense for a stopwatch
    if (settings.mode === "text") {
        return (
            <div className="flex justify-center">
                <TextClock time={displayTime} />
            </div>
        );
    }
    
    // Default digital mode with milliseconds
    const getFontFamily = () => {
        switch (settings.fontFamily) {
            case 'font-body':
                return 'font-body';
            case 'font-mono':
                return 'font-mono';
            case 'font-orbitron':
                return 'font-orbitron';
            case 'font-press-start':
                return 'font-press-start';
            case 'font-digital':
                return 'font-digital';
            default:
                return 'font-mono';
        }
    };

    // Responsive font sizing for stopwatch
    const getResponsiveFontSize = () => {
        const baseSize = 3 * (settings.size / 100); // 3rem on mobile
        const maxSize = 8 * (settings.size / 100);  // 8rem on desktop
        return {
            fontSize: `clamp(${baseSize}rem, ${baseSize}rem + 4vw, ${maxSize}rem)`,
        };
    };

    return (
        <p 
            className={cn("font-bold tracking-tighter transition-all duration-300", getFontFamily())}
            style={{
                color: settings.color,
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
                ...getResponsiveFontSize(),
            }}
        >
            {formatTime(time)}
        </p>
    );
};

export const Stopwatch = () => {
    const pathname = usePathname();
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<Lap[]>([]);
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const lastLapTimeRef = useRef<number>(0);

    const animate = useCallback(() => {
        setTime(Date.now() - startTimeRef.current);
        timerRef.current = requestAnimationFrame(animate);
    }, []);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - time;
            lastLapTimeRef.current = Date.now() - time;
            timerRef.current = requestAnimationFrame(animate);
        }
    };

    const handleStop = () => {
        if (isRunning) {
            setIsRunning(false);
            if (timerRef.current) {
                cancelAnimationFrame(timerRef.current);
            }
        }
    };

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
        if (timerRef.current) {
            cancelAnimationFrame(timerRef.current);
        }
    };

    const handleLap = () => {
        if (isRunning) {
            const now = Date.now();
            const totalTime = now - startTimeRef.current;
            const lapTime = totalTime - (laps.reduce((acc, lap) => acc + lap.lapTime, 0));

            setLaps(prevLaps => [
                {
                    lap: prevLaps.length + 1,
                    lapTime: lapTime,
                    totalTime: totalTime,
                },
                ...prevLaps,
            ]);
        }
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                cancelAnimationFrame(timerRef.current);
            }
        };
    }, []);


    if (!pathname.startsWith('/stopwatch')) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4 pt-20">
            <div className="w-full flex-grow flex flex-col items-center justify-center max-w-2xl">

                
                <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>
                
                <div className="w-full text-center mb-8">
                    <StopwatchDisplay time={time} />
                </div>

                <div className="flex w-full justify-center gap-4 mb-8">
                    <Button 
                        className="w-24 h-24 rounded-full text-lg" 
                        onClick={isRunning ? handleStop : handleStart}
                        variant={isRunning ? "destructive" : "default"}
                    >
                        {isRunning ? "Stop" : "Start"}
                    </Button>
                    <Button 
                        className="w-24 h-24 rounded-full text-lg" 
                        onClick={handleLap} 
                        disabled={!isRunning}
                    >
                        Lap
                    </Button>
                    <Button 
                        className="w-24 h-24 rounded-full text-lg" 
                        onClick={handleReset} 
                        disabled={isRunning || time === 0}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {laps.length > 0 && (
                <Card className="w-full mb-8 max-w-2xl">
                    <CardHeader>
                        <CardTitle>Laps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px]">
                             <div className="flex justify-between font-medium text-muted-foreground px-4 py-2">
                                <span>Lap</span>
                                <span>Lap Time</span>
                                <span>Total Time</span>
                            </div>
                            <Separator />
                            <div className="space-y-2 mt-2">
                                {laps.map((lap) => (
                                    <div key={lap.lap} className="flex justify-between items-center px-4 py-2 rounded-md hover:bg-muted/50" style={{fontVariantNumeric: 'tabular-nums'}}>
                                        <span className="font-bold">{lap.lap}</span>
                                        <span>+{formatTime(lap.lapTime)}</span>
                                        <span>{formatTime(lap.totalTime)}</span>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
            <AdPlaceholder slot={getSlotForPlacement('stopwatch')} />
            <StopwatchFooter />
        </div>
    );
};
