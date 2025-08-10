"use client";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/settings-context";
import { cn } from "@/lib/utils";

export const DateDisplay = () => {
    const [date, setDate] = useState(new Date());
    const { settings } = useSettings();

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    if (settings.activeTab !== 'time') {
        return null;
    }

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="flex flex-col items-center gap-4 mt-4">
            <p className="text-lg text-muted-foreground">
                {formattedDate}
            </p>
        </div>
    );
};
