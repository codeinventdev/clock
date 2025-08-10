import { Separator } from './ui/separator';

export const PageFooter = () => {
    return (
        <div className="mt-12">
            <Separator />
            <div className="py-8 grid grid-cols-1 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online clock</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <p>A free online clock that displays the correct time. It can show the time in your browser with a large, customizable display. Our clock is perfect for classrooms, presentations, or anyone who needs a clear, easy-to-read clock.</p>
                        <p>The time is automatically adjusted based on your computer's settings. For the clock to work correctly, please ensure your device's time is accurate. This online clock is also a fantastic tool for kids learning to tell time.</p>
                        <p>It is simple to use and features a clean, modern design. You can change the clock's color, size, and style (digital, analog, or text) to suit your preferences. Your settings are saved automatically for your next visit.</p>
                        <p>We hope you enjoy using our online clock. If you have any feedback or suggestions, we would love to hear from you. Feel free to reach out to our team.</p>
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
