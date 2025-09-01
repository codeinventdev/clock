import { Separator } from './ui/separator';
import Link from 'next/link';

export const PageFooter = () => {
    return (
        <div className="mt-12">
            <Separator />
            <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-muted-foreground">
                {/* How to Use Section */}
                <div>
                    <h3 className="font-semibold text-foreground mb-4">How to use the online clock</h3>
                    <div className="space-y-4 text-sm">
                        <p>A free online clock that displays the correct time. It can show the time in your browser with a large, customizable display. Our clock is perfect for classrooms, presentations, or anyone who needs a clear, easy-to-read clock.</p>
                        <p>The time is automatically adjusted based on your computer's settings. For the clock to work correctly, please ensure your device's time is accurate. This online clock is also a fantastic tool for kids learning to tell time.</p>
                        <p>It is simple to use and features a clean, modern design. You can change the clock's color, size, and style (digital, analog, or text) to suit your preferences. Your settings are saved automatically for your next visit.</p>
                        <p>We hope you enjoy using our online clock. If you have any feedback or suggestions, we would love to hear from you. Feel free to reach out to our team.</p>
                    </div>
                </div>

                {/* Features and Benefits */}
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Features & Benefits</h3>
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Time Management Tools</h4>
                            <p>Beyond just showing time, our platform includes professional-grade timer, stopwatch, and alarm features. Perfect for productivity techniques like the Pomodoro method, workout intervals, cooking times, and meeting management.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Educational Applications</h4>
                            <p>Teachers and parents can use our large, visible clock displays for classroom time management and helping children learn to read both digital and analog time formats. The customizable size makes it perfect for any learning environment.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Global Time Awareness</h4>
                            <p>Stay connected with our world clock feature, showing accurate times across different time zones. Essential for international business, remote work coordination, and staying in touch with friends and family worldwide.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Content Sections */}
            <Separator />
            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-muted-foreground">
                <div>
                    <h3 className="font-semibold text-foreground mb-4">Why Choose Our Clock?</h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground">Accuracy & Reliability</h4>
                            <p>Synchronized with your device's system time for precision timing across all features.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">No Installation Required</h4>
                            <p>Works instantly in any modern web browser without downloads or plugins.</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground">Completely Free</h4>
                            <p>All features are available at no cost, supported by respectful advertising.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-foreground mb-4">Popular Uses</h3>
                    <div className="space-y-2 text-sm">
                        <p>• Classroom and presentation timing</p>
                        <p>• Pomodoro technique work sessions</p>
                        <p>• Cooking and baking timers</p>
                        <p>• Exercise and workout intervals</p>
                        <p>• Meeting and appointment reminders</p>
                        <p>• Study session management</p>
                        <p>• International time coordination</p>
                        <p>• Daily routine scheduling</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-foreground mb-4">Learn More</h3>
                    <div className="space-y-2 text-sm">
                        <Link href="/about" className="block hover:text-primary transition-colors">
                            About Time & Timekeeping
                        </Link>
                        <Link href="/articles" className="block hover:text-primary transition-colors">
                            Time Management Articles
                        </Link>
                        <Link href="/faq" className="block hover:text-primary transition-colors">
                            Frequently Asked Questions
                        </Link>
                        <div className="pt-2">
                            <p className="text-xs">
                                Stay updated with productivity tips and time management techniques to make the most of every minute.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />
            <div className="text-center text-xs text-muted-foreground py-4">
                <p>Copyright 2025. All rights reserved. | Free Online Clock, Timer, Stopwatch & Alarm Tools</p>
            </div>
        </div>
    )
}
