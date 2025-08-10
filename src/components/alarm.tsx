
"use client";
import { useState, useEffect, useRef } from "react";
import { AlarmDialog, type Alarm as AlarmType } from "./alarm-dialog";
import { RingingAlarmDialog } from "./ringing-alarm-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Switch } from "./ui/switch";
import { AlarmFooter } from "./alarm-footer";
import { Separator } from "./ui/separator";
import { AdPlaceholder } from "./ad-placeholder";
import { getSlotForPlacement } from "@/lib/adsense";
import { usePathname } from 'next/navigation';
import { SharedTimerDisplay } from "./shared-timer-display";

export const Alarm = () => {
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [editingAlarm, setEditingAlarm] = useState<AlarmType | null>(null);
  const [ringingAlarm, setRingingAlarm] = useState<AlarmType | null>(null);
  const triggeredAlarms = useRef<Set<string>>(new Set());

  useEffect(() => {
    try {
      const storedAlarms = localStorage.getItem("time-weaver-alarms");
      if (storedAlarms) {
        setAlarms(JSON.parse(storedAlarms));
      }
    } catch (error) {
      console.error("Failed to parse alarms from localStorage", error);
    }
  }, []);


  
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentPeriod = currentHour >= 12 ? 'PM' : 'AM';
      const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;

      alarms.forEach(alarm => {
        if (
            alarm.enabled &&
            alarm.hour === formattedHour &&
            alarm.minute === currentMinute &&
            alarm.period === currentPeriod
        ) {
          const alarmIdTime = `${alarm.id}-${now.toDateString()}-${formattedHour}:${currentMinute}`;
          if (!triggeredAlarms.current.has(alarmIdTime)) {
            setRingingAlarm(alarm);
            triggeredAlarms.current.add(alarmIdTime);
          }
        }
      });
    };

    const intervalId = setInterval(checkAlarms, 1000);

    return () => clearInterval(intervalId);
  }, [alarms]);

  const saveAlarms = (newAlarms: AlarmType[]) => {
    setAlarms(newAlarms);
    try {
      localStorage.setItem("time-weaver-alarms", JSON.stringify(newAlarms));
    } catch (error) {
      console.error("Failed to save alarms to localStorage", error);
    }
  };

  const handleSaveAlarm = (alarm: AlarmType) => {
    const existing = alarms.find(a => a.id === alarm.id);
    let newAlarms;
    if (existing) {
      newAlarms = alarms.map(a => (a.id === alarm.id ? alarm : a));
    } else {
      newAlarms = [...alarms, alarm];
    }
    saveAlarms(newAlarms.sort((a,b) => (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute)));
  };
  
  const handleToggleAlarm = (id: string, enabled: boolean) => {
    const newAlarms = alarms.map(a => a.id === id ? { ...a, enabled } : a);
    saveAlarms(newAlarms);
  }

  const handleDeleteAlarm = (id: string) => {
    const newAlarms = alarms.filter(a => a.id !== id);
    saveAlarms(newAlarms);
  }
  
  const handleEditAlarm = (alarm: AlarmType) => {
    setEditingAlarm(alarm);
    setIsDialogOpen(true);
  }

  const handleAddAlarmClick = () => {
    setEditingAlarm(null);
    setIsDialogOpen(true);
  }

  const handleStopRinging = () => {
    setRingingAlarm(null);
  }
  
  const handleSnooze = () => {
    if(ringingAlarm) {
        const snoozedAlarm = { ...ringingAlarm };
        const newTime = new Date(new Date().getTime() + 5 * 60000); // 5 minutes from now
        const snoozedHour = newTime.getHours();
        snoozedAlarm.hour = snoozedHour % 12 === 0 ? 12 : snoozedHour % 12;
        snoozedAlarm.minute = newTime.getMinutes();
        snoozedAlarm.period = snoozedHour >=12 ? 'PM' : 'AM';
        snoozedAlarm.title = `${snoozedAlarm.title} (Snoozed)`;
        snoozedAlarm.id = new Date().toISOString();
        handleSaveAlarm(snoozedAlarm);
    }
    setRingingAlarm(null);
  }

  const calculateRemainingTime = (alarm: AlarmType) => {
    const now = new Date();
    const alarmTime = new Date(now);

    let alarmHour = alarm.hour;
    if (alarm.period === 'PM' && alarmHour !== 12) {
      alarmHour += 12;
    }
    if (alarm.period === 'AM' && alarmHour === 12) {
      alarmHour = 0;
    }
    alarmTime.setHours(alarmHour, alarm.minute, 0, 0);

    if (alarmTime.getTime() < now.getTime()) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
    
    const diff = alarmTime.getTime() - now.getTime();
    if (diff <= 0) return 'Ringing...';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `in ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }


  if (!pathname.startsWith('/alarm')) {
    return null;
  }
  
  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center text-foreground w-full max-w-7xl mx-auto p-4">
      <div className="w-full text-center py-4">
        <SharedTimerDisplay size="large" className="mb-4" />
        <p className="text-lg text-muted-foreground mt-4">
          {formattedDate}
        </p>
      </div>

      <Separator className="my-4" />

      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-center mb-6">
          <Button onClick={handleAddAlarmClick}>Add Alarm</Button>
        </div>
      </div>

      <div className="w-full max-w-2xl mb-4">
        {alarms.length === 0 ? (
          <div className="flex items-center justify-center py-2">
            <p className="text-lg text-muted-foreground">
              No alarms set.
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
              {alarms.map((alarm) => (
                  <Card key={alarm.id}>
                      <CardHeader>
                          <div className="flex justify-between items-start">
                              <div>
                                  <CardTitle className="text-2xl">{alarm.title}</CardTitle>
                                  <CardDescription className="text-lg">
                                      {`${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')} ${alarm.period}`}
                                      {alarm.enabled && <span className="text-sm text-muted-foreground ml-2">({calculateRemainingTime(alarm)})</span>}
                                  </CardDescription>
                              </div>
                              <Switch
                                  checked={alarm.enabled}
                                  onCheckedChange={(checked) => handleToggleAlarm(alarm.id, checked)}
                              />
                          </div>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center">
                          <div>
                              <p>Sound: {alarm.sound}</p>
                              <p>Repeat: {alarm.repeat ? 'On' : 'Off'}</p>
                          </div>
                          <div className="flex gap-2">
                              <Button variant="outline" onClick={() => handleEditAlarm(alarm)}>Edit</Button>
                              <Button variant="destructive" onClick={() => handleDeleteAlarm(alarm.id)}>Delete</Button>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
        )}
      </div>

      <AdPlaceholder slot={getSlotForPlacement('alarm')} />

      <Separator className="my-4" />

      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Alarm Presets</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              { time: "6:00 AM", hour: 6, minute: 0, period: "AM" as const },
              { time: "6:30 AM", hour: 6, minute: 30, period: "AM" as const },
              { time: "7:00 AM", hour: 7, minute: 0, period: "AM" as const },
              { time: "7:30 AM", hour: 7, minute: 30, period: "AM" as const },
              { time: "8:00 AM", hour: 8, minute: 0, period: "AM" as const },
              { time: "8:30 AM", hour: 8, minute: 30, period: "AM" as const },
              { time: "9:00 AM", hour: 9, minute: 0, period: "AM" as const },
              { time: "10:00 AM", hour: 10, minute: 0, period: "AM" as const },
              { time: "11:00 AM", hour: 11, minute: 0, period: "AM" as const },
              { time: "12:00 PM", hour: 12, minute: 0, period: "PM" as const },
              { time: "1:00 PM", hour: 1, minute: 0, period: "PM" as const },
              { time: "2:00 PM", hour: 2, minute: 0, period: "PM" as const },
            ].map((preset) => (
              <Button 
                key={preset.time} 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newAlarm = {
                    id: new Date().toISOString(),
                    hour: preset.hour,
                    minute: preset.minute,
                    period: preset.period,
                    sound: 'Alarm',
                    repeat: false,
                    title: `${preset.time} Alarm`,
                    enabled: true
                  };
                  handleSaveAlarm(newAlarm);
                }}
                className="text-xs"
              >
                {preset.time}
              </Button>
            ))}
          </div>
        </div>

      <AlarmFooter />
      <AlarmDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSaveAlarm}
        alarm={editingAlarm}
      />
      {ringingAlarm && (
        <RingingAlarmDialog
            alarm={ringingAlarm}
            onStop={handleStopRinging}
            onSnooze={handleSnooze}
        />
      )}
    </div>
  );
};
