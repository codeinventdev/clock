import { Separator } from './ui/separator';

export const StopwatchFooter = () => {
    return (
        <div className="mt-12 w-full">
            <Separator />
            <div className="py-8 grid grid-cols-1 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online stopwatch</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <p>A simple and free online stopwatch. You can start, stop, and reset the stopwatch with ease. You can also record laps to track split times. The stopwatch is perfect for timing sports, workouts, and other activities.</p>
                        <p>The stopwatch will continue to run even if you close your browser window. Your laps and time are saved automatically for your next visit. We hope you enjoy our accurate and reliable online stopwatch.</p>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="text-center text-xs text-muted-foreground py-4">
                <p>Copyright 2025. All rights reserved.</p>
            </div>
        </div>
    )
}
