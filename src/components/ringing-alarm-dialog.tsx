
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// Use API route to avoid direct server function calls from client
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import type { Alarm } from './alarm-dialog';

interface RingingAlarmDialogProps {
  alarm: Alarm;
  onStop: () => void;
  onSnooze: () => void;
}

export const RingingAlarmDialog = ({ alarm, onStop, onSnooze }: RingingAlarmDialogProps) => {
    const { toast } = useToast();
    const stopRef = useRef<null | (() => void)>(null);

    useEffect(() => {
        const generateSound = async () => {
            try {
                if (stopRef.current) stopRef.current();
                const { playNamedSound } = await import('@/lib/sounds');
                stopRef.current = await playNamedSound(alarm.sound, { loop: alarm.repeat });
            } catch (e) {
                toast({
                  title: "Alarm Sound Error",
                  description: "Could not play alarm sound.",
                  variant: "destructive"
                });
                console.error(e);
            }
        };
        generateSound();
    }, [alarm, toast]);

    useEffect(() => {
        return () => {
            if (stopRef.current) stopRef.current();
        };
    }, []);


    return (
        <AlertDialog open={true} onOpenChange={onStop}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold text-center">
                        {alarm.title}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-center text-5xl font-mono py-4">
                    {`${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')} ${alarm.period}`}
                </div>
                <AlertDialogFooter className="flex justify-center gap-4">
                    <Button onClick={onSnooze} variant="outline" size="lg">Snooze</Button>
                    <Button onClick={onStop} size="lg">Stop</Button>
                </AlertDialogFooter>
                 {/* WebAudio-based sound; no <audio> element needed */}
            </AlertDialogContent>
        </AlertDialog>
    );
};
