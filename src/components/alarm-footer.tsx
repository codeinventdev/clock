import { Separator } from './ui/separator';
import Link from 'next/link';

export const AlarmFooter = () => {
    return (
        <div className="mt-12">
            <Separator />
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online alarm clock</h3>
                    <div className="space-y-3 text-sm">
                        <p>Set a free online alarm to wake you up or remind you of important events. You can create multiple alarms with different sounds, titles, and repeat settings. Our alarm clock is reliable and easy to use.</p>
                        <p>The alarm will sound even if you minimize your browser. Choose from a variety of alarm sounds, and customize the alarm to repeat on specific days. Your settings are saved automatically for your next visit.</p>
                        <p>Perfect for short-term reminders, meeting alerts, medication schedules, and daily routine management. Set custom labels to remember what each alarm is for when it rings.</p>
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Alarm Best Practices</h3>
                    <div className="space-y-2 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground">Browser Requirements</h4>
                            <p>Keep your browser tab open and active for alarms to function properly.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Audio Settings</h4>
                            <p>Ensure device volume is up and browser audio permissions are enabled.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Repeat Options</h4>
                            <p>Set daily, weekday, or custom repeat patterns for recurring reminders.</p>
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
                    Copyright 2025. All rights reserved. | Free Online Alarm Clock
                </p>
            </div>
        </div>
    )
}
