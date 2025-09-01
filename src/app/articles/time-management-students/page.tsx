import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { BookOpen, Clock, CheckCircle, Brain, Target, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Essential Time Management Tips for Students | Study Productivity Guide',
  description: 'Discover proven time management strategies for students. Learn to balance studies, work, and personal life with effective scheduling, study techniques, and productivity tools.',
  keywords: 'student time management, study tips, college productivity, exam preparation, study schedule, academic success, time blocking for students',
  openGraph: {
    title: 'Essential Time Management Tips for Students',
    description: 'Proven strategies to balance studies, work, and personal life effectively.',
    type: 'article',
  },
};

export default function StudentTimeManagementPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8 pt-32">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">Education</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Essential Time Management Tips for Students</h1>
          <p className="text-lg text-muted-foreground">
            Master your schedule, boost productivity, and achieve academic success with proven time management strategies
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>8 min read</span>
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
            As a student, you're juggling multiple responsibilities: classes, assignments, exams, work, 
            social activities, and personal commitments. Effective time management isn't just about getting 
            better grades—it's about reducing stress, maintaining work-life balance, and setting yourself 
            up for long-term success.
          </p>
        </div>

        {/* Core Strategies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Foundation: Core Time Management Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Priority-Based Planning
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Use the Eisenhower Matrix to categorize tasks by urgency and importance. 
                    Focus on important tasks first, whether they're urgent or not. This prevents 
                    last-minute cramming and reduces academic stress.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Time Blocking Method
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Schedule specific time blocks for different activities: lectures, study sessions, 
                    meals, exercise, and relaxation. Use our timer to stick to these blocks and 
                    avoid overrunning scheduled activities.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    The 2-Minute Rule
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    If a task takes less than 2 minutes, do it immediately. This applies to 
                    responding to emails, filing documents, or quick administrative tasks. 
                    Use our stopwatch to time these micro-tasks.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Buffer Time Strategy
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Always add 25% extra time to your estimates. If you think an assignment 
                    will take 4 hours, schedule 5 hours. This accounts for unexpected delays 
                    and reduces stress when things take longer than expected.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Techniques */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Effective Study Time Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">The Pomodoro Technique for Students</h4>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">25</div>
                      <div className="text-sm">minutes focused study</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                      <div className="text-sm">minute break</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">4x</div>
                      <div className="text-sm">repeat cycles</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">15-30</div>
                      <div className="text-sm">minute long break</div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  This technique is particularly effective for reading, writing assignments, and 
                  problem-solving. Use our timer to maintain strict adherence to these intervals.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Active Study Sessions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Start with the most challenging material when your mind is fresh</li>
                    <li>• Use active recall instead of passive reading</li>
                    <li>• Create practice questions and quiz yourself</li>
                    <li>• Teach concepts to others or explain them aloud</li>
                    <li>• Take notes by hand when possible for better retention</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Study Environment Setup</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Designate a specific study space free from distractions</li>
                    <li>• Use website blockers during study sessions</li>
                    <li>• Keep your phone in another room or on airplane mode</li>
                    <li>• Have all materials ready before starting</li>
                    <li>• Use our large clock display for time awareness</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Weekly and Daily Planning */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Strategic Planning Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Weekly Planning Ritual</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Spend 30 minutes every Sunday planning your upcoming week. This investment 
                  saves hours during the week and reduces decision fatigue.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Academic Planning</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Review syllabi and upcoming deadlines</li>
                      <li>• Schedule study sessions for each subject</li>
                      <li>• Plan assignment work in chunks</li>
                      <li>• Book library study rooms if needed</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Life Balance</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Schedule exercise and meal times</li>
                      <li>• Plan social activities and relaxation</li>
                      <li>• Set aside time for chores and errands</li>
                      <li>• Include buffer time for unexpected events</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Daily Review Process</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Spend 10 minutes each evening reviewing your day and planning tomorrow. 
                  This simple habit dramatically improves your productivity and reduces morning stress.
                </p>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h5 className="font-medium">Review Today's Accomplishments</h5>
                      <p className="text-xs text-muted-foreground">Acknowledge what you completed and identify what worked well.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h5 className="font-medium">Identify Tomorrow's Priorities</h5>
                      <p className="text-xs text-muted-foreground">Choose 3-5 most important tasks for the next day.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h5 className="font-medium">Prepare for Success</h5>
                      <p className="text-xs text-muted-foreground">Set out materials, charge devices, and remove potential obstacles.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Overcoming Procrastination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm">The 5-Minute Start Rule</h5>
                <p className="text-muted-foreground text-xs">
                  Commit to working on a task for just 5 minutes. Often, starting is the hardest part, 
                  and you'll find yourself continuing beyond the initial 5 minutes.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Break Down Large Tasks</h5>
                <p className="text-muted-foreground text-xs">
                  Divide overwhelming projects into smaller, specific actions. Instead of "write research paper," 
                  use "research 5 sources," "create outline," "write introduction."
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Use Implementation Intentions</h5>
                <p className="text-muted-foreground text-xs">
                  Plan specific when and where you'll study: "After lunch at 1 PM, I will study chemistry 
                  in the library for 2 hours." This removes decision-making from the equation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Multiple Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm">Deadline Mapping</h5>
                <p className="text-muted-foreground text-xs">
                  Create a visual timeline of all deadlines for the semester. Work backwards from 
                  each deadline to schedule preparation time well in advance.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">The 1-3-5 Rule</h5>
                <p className="text-muted-foreground text-xs">
                  Each day, aim to complete 1 big task, 3 medium tasks, and 5 small tasks. 
                  This provides structure while remaining realistic about daily capacity.
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm">Emergency Protocols</h5>
                <p className="text-muted-foreground text-xs">
                  Have a plan for when everything goes wrong. Know which tasks can be postponed, 
                  which professors allow extensions, and how to prioritize under pressure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mb-8 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Start Implementing These Strategies Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Begin with just one technique and gradually add others. Use our timer tools to 
              implement the Pomodoro technique and track your study sessions effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/timer">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Start a Study Timer
                </button>
              </Link>
              <Link href="/articles">
                <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold">
                  Read More Articles
                </button>
              </Link>
            </div>
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
            More Study Tips →
          </Link>
        </div>

      </main>
    </div>
  );
}
