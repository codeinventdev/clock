import { Separator } from './ui/separator';
import Link from 'next/link';

export const TimerFooter = () => {
    return (
        <div className="mt-12">
            <Separator />
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">About Online Timers</h3>
                    <div className="space-y-3 text-sm">
                        <p>
                            Online countdown timers are essential tools for time management, productivity, and focus. 
                            Whether you're following the Pomodoro technique, timing cooking sessions, managing workout 
                            intervals, or setting study periods, our timer provides accurate, reliable countdown functionality.
                        </p>
                        <p>
                            Our timer features include multiple simultaneous countdowns, custom labels, audio alerts, 
                            and the ability to continue counting past zero. This ensures you never miss important 
                            deadlines and can track exactly how much time has elapsed.
                        </p>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Timer Tips & Uses</h3>
                    <div className="space-y-2 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground">Productivity Techniques</h4>
                            <p>Use 25-minute Pomodoro sessions, 50-minute focus blocks, or custom work intervals.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Kitchen & Cooking</h4>
                            <p>Perfect for baking, boiling, steaming, and recipe timing with multiple dish coordination.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Exercise & Fitness</h4>
                            <p>Time workout intervals, rest periods, plank holds, and circuit training sessions.</p>
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
                    Copyright 2025. All rights reserved. | Professional Online Timer Tools
                </p>
            </div>
        </div>
    )
}
