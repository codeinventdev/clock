import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { HelpCircle, Clock, Timer, AlarmClock, Watch, Globe, Settings } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Online Clock, Timer & Stopwatch Help | WKClock',
  description: 'Frequently asked questions about using our online clock, timer, stopwatch, and alarm features. Get help with time zones, customization, and troubleshooting.',
  keywords: 'online clock FAQ, timer help, stopwatch questions, alarm clock support, time zone help, clock customization',
  openGraph: {
    title: 'Frequently Asked Questions - WKClock',
    description: 'Find answers to common questions about using our online timing tools.',
    type: 'website',
    url: 'https://wklock.com/faq',
  },
  alternates: {
    canonical: 'https://wklock.com/faq',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSections = [
  {
    title: 'General Clock Features',
    icon: Clock,
    questions: [
      {
        q: 'How accurate is the online clock?',
        a: 'Our online clock synchronizes with your device\'s system time, which is typically accurate to within a few milliseconds. The accuracy depends on your device\'s time synchronization with internet time servers. For most purposes, this provides sufficient precision.'
      },
      {
        q: 'Can I customize the clock appearance?',
        a: 'Yes! You can customize the clock color, size (50%-200%), font family, and choose between digital, analog, or text display modes. You can also toggle the seconds display on/off. All settings are automatically saved for your next visit.'
      },
      {
        q: 'Does the clock work offline?',
        a: 'The clock will continue to work offline as long as your browser tab remains open, as it uses your device\'s local time. However, you\'ll need an internet connection to access the website initially and for features like world time zones.'
      },
      {
        q: 'Why does the page title show the current time?',
        a: 'This feature helps you keep track of time even when the tab is not visible. The title updates every second, allowing you to see the current time in your browser tab or taskbar.'
      }
    ]
  },
  {
    title: 'Timer Functions',
    icon: Timer,
    questions: [
      {
        q: 'How do I set a countdown timer?',
        a: 'Click the "Set Timer" button on the timer page, then enter your desired hours, minutes, and seconds. You can also add a custom label for your timer. Once set, click start to begin the countdown. The timer will alert you with sound when it reaches zero.'
      },
      {
        q: 'Can I run multiple timers at once?',
        a: 'Yes! You can create and run multiple timers simultaneously. Each timer can have its own custom duration and label, making it perfect for managing different tasks or activities at the same time.'
      },
      {
        q: 'What happens when a timer reaches zero?',
        a: 'When a timer reaches zero, it will play an alert sound and continue running in negative time (showing how much time has passed since the original deadline). This ensures you don\'t miss the notification even if you\'re not actively watching.'
      },
      {
        q: 'Can I pause and resume timers?',
        a: 'Yes, you can pause any running timer and resume it later. The timer will remember exactly where it was paused and continue from that point when resumed.'
      }
    ]
  },
  {
    title: 'Alarm Features',
    icon: AlarmClock,
    questions: [
      {
        q: 'How do I set an alarm?',
        a: 'Navigate to the alarm page and click "Set Alarm". Choose your desired time, select repeat options (once, daily, weekdays, etc.), and optionally add a custom label. The alarm will trigger at the specified time with an audible alert.'
      },
      {
        q: 'Do alarms work if I close my browser?',
        a: 'Alarms only work while your browser tab remains open. For the alarm to function, you need to keep the browser tab active. We recommend using this for short-term reminders rather than overnight alarms.'
      },
      {
        q: 'Can I set repeating alarms?',
        a: 'Yes, you can set alarms to repeat daily, on weekdays only, or on specific days of the week. This is perfect for regular reminders like meetings, medication times, or daily routines.'
      },
      {
        q: 'What sound does the alarm make?',
        a: 'The alarm uses a built-in alert sound that\'s designed to be noticeable but not jarring. The sound will repeat until you dismiss the alarm to ensure you don\'t miss it.'
      }
    ]
  },
  {
    title: 'Stopwatch Usage',
    icon: Watch,
    questions: [
      {
        q: 'How precise is the stopwatch?',
        a: 'Our stopwatch displays time down to hundredths of a second (centiseconds) and updates in real-time. While the display precision is high, the actual accuracy depends on your browser and device performance.'
      },
      {
        q: 'Can I record lap times?',
        a: 'Yes! While the stopwatch is running, you can click the "Lap" button to record split times. This is useful for timing multiple segments of an activity or comparing performance across different intervals.'
      },
      {
        q: 'How do I reset the stopwatch?',
        a: 'Click the "Reset" button to return the stopwatch to 00:00:00. This will also clear any recorded lap times. You can reset the stopwatch whether it\'s running, paused, or stopped.'
      },
      {
        q: 'Is there a limit to how long the stopwatch can run?',
        a: 'The stopwatch can run for extended periods, but very long durations (over 24 hours) may affect browser performance. For practical timing needs, the stopwatch works reliably for hours at a time.'
      }
    ]
  },
  {
    title: 'World Clock & Time Zones',
    icon: Globe,
    questions: [
      {
        q: 'How many time zones are supported?',
        a: 'Our world clock supports hundreds of major cities and time zones worldwide. We include popular business centers, capital cities, and major metropolitan areas across all continents.'
      },
      {
        q: 'Does the world clock account for daylight saving time?',
        a: 'Yes, the world clock automatically adjusts for daylight saving time (DST) based on each location\'s local rules. Times are updated automatically when DST begins or ends in different regions.'
      },
      {
        q: 'Can I add custom cities to the world clock?',
        a: 'Currently, you can select from our pre-configured list of major cities. Each city represents a specific time zone, and you can view multiple cities simultaneously to compare times across different regions.'
      },
      {
        q: 'Why do some cities show different times than expected?',
        a: 'Time differences may occur due to daylight saving time transitions, recent time zone changes in certain countries, or political decisions to modify local time standards. Our system updates automatically based on standard time zone databases.'
      }
    ]
  },
  {
    title: 'Holiday Countdowns',
    icon: HelpCircle,
    questions: [
      {
        q: 'Which holidays are included in the countdown timers?',
        a: 'We include major international holidays like New Year\'s Day, Christmas, Easter, Thanksgiving, Valentine\'s Day, Halloween, and many others. The list covers both fixed-date holidays and those that change each year.'
      },
      {
        q: 'Do holiday dates update automatically each year?',
        a: 'Yes! Holiday countdowns automatically calculate the correct date for each year, including holidays that change dates like Easter, Thanksgiving, and Mother\'s Day. The countdown always shows time remaining until the next occurrence.'
      },
      {
        q: 'Can I create custom holiday countdowns?',
        a: 'While you can\'t add holidays to our preset list, you can use the regular timer function to create countdowns to any specific date and time, effectively creating your own custom holiday or event countdown.'
      },
      {
        q: 'What happens when a holiday arrives?',
        a: 'When a holiday countdown reaches zero, it displays a celebration message and automatically begins counting down to the same holiday next year. This ensures the countdown is always relevant and useful.'
      }
    ]
  },
  {
    title: 'Technical Support',
    icon: Settings,
    questions: [
      {
        q: 'What browsers are supported?',
        a: 'Our clock works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best performance and latest features.'
      },
      {
        q: 'Why isn\'t sound working for timers and alarms?',
        a: 'Most browsers require user interaction before playing audio. Make sure you\'ve clicked somewhere on the page before setting timers or alarms. Also check that your device volume is up and browser audio isn\'t muted.'
      },
      {
        q: 'Can I use this on mobile devices?',
        a: 'Yes! Our clock is fully responsive and works great on smartphones and tablets. The interface adapts to smaller screens while maintaining all functionality. You can add it to your home screen as a web app.'
      },
      {
        q: 'Are my settings saved between visits?',
        a: 'Yes, your customization preferences (colors, size, display mode, etc.) are saved in your browser\'s local storage and will be restored when you return to the site, even after closing your browser.'
      },
      {
        q: 'Is an internet connection required?',
        a: 'An internet connection is needed to initially load the website. Once loaded, basic clock functions work offline, but features like world time zones and holiday updates require an active connection.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8 pt-32">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about using our online clock, timer, stopwatch, and alarm features.
          </p>
        </div>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('home')} />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-6 w-6 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${sectionIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ad Placement */}
        <div className="my-12">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you can\'t find the answer you\'re looking for, we\'d love to help! 
              Our support team is here to assist you with any questions about using our clock tools.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For technical support or feature requests, please check our documentation 
                or reach out through our support channels.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mt-8">
          <AdPlaceholder slot={getSlotForPlacement('stopwatch')} />
        </div>

      </main>
    </div>
  );
}
