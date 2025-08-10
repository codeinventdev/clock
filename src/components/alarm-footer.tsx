import { Separator } from './ui/separator';

export const AlarmFooter = () => {
    return (
        <div className="mt-12">
            <Separator />
            <div className="py-8 grid grid-cols-1 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online alarm clock</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <p>Set a free online alarm to wake you up or remind you of important events. You can create multiple alarms with different sounds, titles, and repeat settings. Our alarm clock is reliable and easy to use.</p>
                        <p>The alarm will sound even if you minimize your browser. Choose from a variety of alarm sounds, and customize the alarm to repeat on specific days. Your settings are saved automatically for your next visit.</p>
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
