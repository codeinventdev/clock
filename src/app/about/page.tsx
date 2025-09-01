import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { Clock, History, Globe, Calculator, BookOpen, Lightbulb } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Online Clocks & Time Management | WKClock',
  description: 'Learn about the history of timekeeping, digital vs analog clocks, time zones, and effective time management techniques. Comprehensive guide to using online clock tools.',
  keywords: 'online clock, time management, timekeeping history, digital clock, analog clock, time zones, productivity, Pomodoro technique',
  openGraph: {
    title: 'About Online Clocks & Time Management',
    description: 'Discover the fascinating world of timekeeping and learn time management techniques.',
    type: 'article',
    url: 'https://wklock.com/about',
  },
  alternates: {
    canonical: 'https://wklock.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8 pt-28">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Online Clocks & Time Management</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the fascinating world of timekeeping, from ancient sundials to modern atomic clocks, 
            and learn how to master time management in your daily life.
          </p>
        </div>

        {/* Ad Placement */}
        <div className="mb-12">
          <AdPlaceholder slot={getSlotForPlacement('home')} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* History of Timekeeping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-6 w-6 text-primary" />
                The History of Timekeeping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                The measurement of time has been a human obsession for millennia. Early civilizations used 
                natural phenomena like the sun's position, moon phases, and seasonal changes to track time.
              </p>
              <p>
                <strong>Ancient Methods:</strong> Sundials were among the first time-measuring devices, 
                used by the Egyptians around 3500 BCE. Water clocks, or clepsydra, were developed to 
                measure time during cloudy days and nights.
              </p>
              <p>
                <strong>Mechanical Revolution:</strong> The first mechanical clocks appeared in medieval 
                Europe around the 13th century. These tower clocks used escapement mechanisms to regulate 
                the release of energy, making timekeeping more accurate.
              </p>
              <p>
                <strong>Modern Precision:</strong> Today's atomic clocks are accurate to within one second 
                in 15 billion years, using the vibrations of cesium atoms to maintain precise time standards.
              </p>
            </CardContent>
          </Card>

          {/* Digital vs Analog */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Digital vs Analog Clocks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                Understanding the differences between digital and analog time displays can help you 
                choose the best format for your needs.
              </p>
              <div>
                <strong>Analog Clocks:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Show time relationships visually with hands and positions</li>
                  <li>Better for understanding time concepts and durations</li>
                  <li>Easier to estimate "about" times (quarter past, half past)</li>
                  <li>Traditional and aesthetically pleasing design</li>
                </ul>
              </div>
              <div>
                <strong>Digital Clocks:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Display exact time with numerical precision</li>
                  <li>Faster to read for specific minute accuracy</li>
                  <li>Better for scheduling and punctuality</li>
                  <li>Can display additional information (date, seconds)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Time Zones & World Time */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              Understanding Time Zones and World Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed">
            <p>
              Time zones are geographical regions where the same standard time is used. The concept 
              was developed to coordinate time across different locations as global communication 
              and transportation improved.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">How Time Zones Work</h4>
                <p className="text-muted-foreground mb-3">
                  The Earth is divided into 24 time zones, each roughly 15 degrees of longitude wide. 
                  As the Earth rotates 360 degrees in 24 hours, each zone represents one hour of difference.
                </p>
                <p className="text-muted-foreground">
                  The Prime Meridian (0° longitude) through Greenwich, England, serves as the reference 
                  point for Coordinated Universal Time (UTC), from which all other time zones are calculated.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Daylight Saving Time</h4>
                <p className="text-muted-foreground mb-3">
                  Many regions observe Daylight Saving Time (DST), moving clocks forward one hour 
                  during warmer months to make better use of natural daylight.
                </p>
                <p className="text-muted-foreground">
                  This practice affects time zone calculations and is why our world clock automatically 
                  adjusts for DST changes throughout the year.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-12">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Time Management & Productivity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Time Management Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                Effective time management is crucial for productivity and work-life balance. 
                Here are proven techniques you can implement using our timer tools:
              </p>
              
              <div>
                <strong>Pomodoro Technique:</strong>
                <p className="text-muted-foreground mt-1">
                  Work for 25-minute focused intervals followed by 5-minute breaks. After 4 cycles, 
                  take a longer 15-30 minute break. Use our timer to track these intervals.
                </p>
              </div>
              
              <div>
                <strong>Time Blocking:</strong>
                <p className="text-muted-foreground mt-1">
                  Schedule specific blocks of time for different activities. Set timers for each 
                  block to maintain focus and ensure you stick to your schedule.
                </p>
              </div>
              
              <div>
                <strong>The 2-Minute Rule:</strong>
                <p className="text-muted-foreground mt-1">
                  If a task takes less than 2 minutes, do it immediately rather than postponing it. 
                  Use our stopwatch to time quick tasks and build this habit.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Study & Learning Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                Our timing tools are perfect for educational settings and personal learning. 
                Here's how students and educators can benefit:
              </p>
              
              <div>
                <strong>Classroom Management:</strong>
                <p className="text-muted-foreground mt-1">
                  Teachers can use our large, visible clock for classroom time awareness and 
                  set timers for activities, tests, and transitions between subjects.
                </p>
              </div>
              
              <div>
                <strong>Study Sessions:</strong>
                <p className="text-muted-foreground mt-1">
                  Students can use the Pomodoro technique for focused study sessions, 
                  time practice tests, and manage study schedules effectively.
                </p>
              </div>
              
              <div>
                <strong>Presentation Practice:</strong>
                <p className="text-muted-foreground mt-1">
                  Practice presentations with our timer to ensure you stay within time limits 
                  and develop better pacing for public speaking.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Benefits Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Why Use Online Clock Tools?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Accessibility</h4>
                <p className="text-muted-foreground">
                  Access your timing tools from any device with an internet connection. 
                  No downloads or installations required - just open your browser and start.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Customization</h4>
                <p className="text-muted-foreground">
                  Personalize your clock display with different colors, sizes, and formats. 
                  Save your preferences for a consistent experience across sessions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Reliability</h4>
                <p className="text-muted-foreground">
                  Our clocks sync with your device's system time and automatically adjust 
                  for time zone changes and daylight saving time transitions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('stopwatch')} />
        </div>

      </main>
    </div>
  );
}
