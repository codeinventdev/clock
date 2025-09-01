import { Separator } from './ui/separator';
import Link from 'next/link';

export const StopwatchFooter = () => {
    return (
        <div className="mt-12 w-full">
            <Separator />
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online stopwatch</h3>
                    <div className="space-y-3 text-sm">
                        <p>A simple and free online stopwatch. You can start, stop, and reset the stopwatch with ease. You can also record laps to track split times. The stopwatch is perfect for timing sports, workouts, and other activities.</p>
                        <p>The stopwatch displays time down to centiseconds (hundredths of a second) for precise timing. Use the lap feature to record split times during running, swimming, or any activity where interval timing matters.</p>
                        <p>Perfect for athletic training, cooking, study sessions, and any situation where you need to measure elapsed time accurately. The large, clear display makes it easy to read at a glance.</p>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Stopwatch Applications</h3>
                    <div className="space-y-2 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground">Sports & Fitness</h4>
                            <p>Time laps, races, workout intervals, and rest periods with precise accuracy.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Study & Work</h4>
                            <p>Track focus sessions, measure task completion times, and productivity analysis.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Cooking & Activities</h4>
                            <p>Time cooking processes, presentations, games, and any time-sensitive activities.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="text-center py-4">
                <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-2">
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="/articles" className="hover:text-primary transition-colors">Articles</Link>
                    <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                </div>
                <p className="text-xs text-muted-foreground">
                    Copyright 2025. All rights reserved. | Precision Online Stopwatch
                </p>
            </div>
        </div>
    )
}
