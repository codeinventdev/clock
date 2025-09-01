import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { Timer, Clock, PlayCircle, PauseCircle, RotateCcw, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Guide to the Pomodoro Technique | Time Management | WKClock',
  description: 'Master the Pomodoro Technique with our comprehensive guide. Learn 25-minute focus intervals, break strategies, and productivity tips to boost your focus and efficiency.',
  keywords: 'Pomodoro technique, time management, productivity, focus, work intervals, time boxing, Francesco Cirillo, online timer',
  openGraph: {
    title: 'The Complete Guide to the Pomodoro Technique',
    description: 'Master this proven time management method to boost focus, reduce fatigue, and increase productivity.',
    type: 'article',
  },
};

export default function PomodoroGuidePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8 pt-28">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">Time Management</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Complete Guide to the Pomodoro Technique</h1>
          <p className="text-lg text-muted-foreground">
            Master this proven time management method to boost focus, reduce fatigue, and increase productivity
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>12 min read</span>
            <span>•</span>
            <span>Updated January 2025</span>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('home')} />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique has become one of the most 
            popular time management methods worldwide. Named after the tomato-shaped kitchen timer Cirillo used 
            as a university student, this technique breaks work into focused intervals separated by short breaks.
          </p>
        </div>

        {/* What is Pomodoro */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-6 w-6 text-primary" />
              What is the Pomodoro Technique?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Pomodoro Technique is a time management method that uses a timer to break work into 
              intervals, traditionally 25 minutes in length, separated by short breaks. Each interval 
              is known as a "pomodoro," the Italian word for tomato.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">The Basic Cycle:</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full mx-auto mb-2 w-fit">
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">25 minutes</div>
                  <div className="text-xs text-muted-foreground">Focused work</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full mx-auto mb-2 w-fit">
                    <PauseCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">5 minutes</div>
                  <div className="text-xs text-muted-foreground">Short break</div>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full mx-auto mb-2 w-fit">
                    <RotateCcw className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Repeat</div>
                  <div className="text-xs text-muted-foreground">3 more times</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full mx-auto mb-2 w-fit">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">15-30 min</div>
                  <div className="text-xs text-muted-foreground">Long break</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Implement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step-by-Step Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold mb-2">Choose Your Task</h4>
                  <p className="text-muted-foreground text-sm">
                    Select a specific task you want to work on. Write it down and estimate how many 
                    pomodoros it will take to complete. Break large tasks into smaller, manageable pieces.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold mb-2">Set Your Timer</h4>
                  <p className="text-muted-foreground text-sm">
                    Use our online timer to set 25 minutes. This is your pomodoro interval. 
                    Having a visible countdown helps maintain focus and creates urgency.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold mb-2">Work Until the Timer Rings</h4>
                  <p className="text-muted-foreground text-sm">
                    Focus completely on your chosen task. Resist all urges to multitask or switch 
                    to other activities. If you think of something else, write it down for later.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold mb-2">Take a Short Break</h4>
                  <p className="text-muted-foreground text-sm">
                    When the timer rings, immediately stop working and take a 5-minute break. 
                    Step away from your workspace, stretch, hydrate, or do light movement.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                <div>
                  <h4 className="font-semibold mb-2">Repeat and Take Long Breaks</h4>
                  <p className="text-muted-foreground text-sm">
                    After completing 4 pomodoros, take a longer break of 15-30 minutes. 
                    This helps your brain recharge for the next set of focused work sessions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why the Pomodoro Technique Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Improved Focus
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  The time constraint creates urgency and helps eliminate distractions. 
                  Knowing you only need to focus for 25 minutes makes starting easier.
                </p>
                
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Reduced Mental Fatigue
                </h4>
                <p className="text-muted-foreground text-sm">
                  Regular breaks prevent burnout and keep your mind fresh. 
                  The technique leverages natural attention spans for optimal performance.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Better Time Estimation
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Tracking pomodoros helps you understand how long tasks actually take, 
                  leading to more accurate planning and scheduling.
                </p>
                
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Sense of Accomplishment
                </h4>
                <p className="text-muted-foreground text-sm">
                  Completing each pomodoro provides immediate gratification and 
                  motivation to continue with the next work session.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Variations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pro Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm">Plan Your Pomodoros</h5>
                <p className="text-muted-foreground text-xs">
                  At the start of each day, estimate how many pomodoros each task will take.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Handle Interruptions</h5>
                <p className="text-muted-foreground text-xs">
                  For external interruptions, inform others you'll get back to them. 
                  For internal distractions, write them down to address later.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Use the Breaks Wisely</h5>
                <p className="text-muted-foreground text-xs">
                  Avoid screens during breaks. Instead, stretch, walk, or do breathing exercises.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Track Your Progress</h5>
                <p className="text-muted-foreground text-xs">
                  Keep a log of completed pomodoros to see patterns and celebrate achievements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technique Variations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm">Extended Pomodoro (50/10)</h5>
                <p className="text-muted-foreground text-xs">
                  Work for 50 minutes with 10-minute breaks for tasks requiring deeper concentration.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Micro Pomodoro (15/5)</h5>
                <p className="text-muted-foreground text-xs">
                  Perfect for beginners or when feeling overwhelmed. Start small and build habits.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Timeboxing Hybrid</h5>
                <p className="text-muted-foreground text-xs">
                  Combine with time-blocking by scheduling specific pomodoros for different tasks.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Team Pomodoros</h5>
                <p className="text-muted-foreground text-xs">
                  Synchronize work sessions with teammates for collaborative focused work periods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mb-8 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Try the Pomodoro Technique?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start implementing this powerful technique today using our online timer. 
              Set your first 25-minute focused work session and experience the difference.
            </p>
            <Link href="/timer">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                Start Your First Pomodoro
              </button>
            </Link>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('stopwatch')} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t">
          <Link href="/articles" className="text-primary hover:underline">
            ← Back to Articles
          </Link>
          <Link href="/articles" className="text-primary hover:underline">
            More Time Management Tips →
          </Link>
        </div>

      </main>
    </div>
  );
}
