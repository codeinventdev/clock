import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { Briefcase, Home, Clock, Users, Target, Settings, Wifi, Coffee } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boosting Productivity While Working from Home | Remote Work Guide',
  description: 'Master remote work with proven productivity strategies, time management techniques, and home office optimization tips for maximum efficiency and work-life balance.',
  keywords: 'work from home, remote work productivity, home office setup, time management, work-life balance, remote work tips, telecommuting',
  openGraph: {
    title: 'Boosting Productivity While Working from Home',
    description: 'Learn how to create effective routines and use timing techniques to stay focused in remote work environments.',
    type: 'article',
  },
};

export default function WorkFromHomeProductivityPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-4xl mx-auto p-4 md:p-8 pt-24">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">Productivity</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Boosting Productivity While Working from Home</h1>
          <p className="text-lg text-muted-foreground">
            Create effective routines, maintain focus, and achieve peak performance in your remote work environment
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>10 min read</span>
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
            Working from home has become the new normal for millions of professionals worldwide. While remote work 
            offers flexibility and eliminates commute time, it also presents unique challenges: distractions, 
            isolation, blurred boundaries between work and personal life, and the need for self-discipline. 
            This comprehensive guide will help you master remote work productivity.
          </p>
        </div>

        {/* Setting Up Your Environment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              Creating Your Productive Home Office
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Physical Workspace Setup</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Dedicated Work Area</h5>
                    <p className="text-muted-foreground">
                      Even in small spaces, create a designated work zone. This psychological boundary 
                      helps your brain switch into work mode and maintains work-life separation.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Ergonomic Considerations</h5>
                    <p className="text-muted-foreground">
                      Invest in a proper chair, position your monitor at eye level, and ensure adequate 
                      lighting. Physical comfort directly impacts productivity and long-term health.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Minimize Distractions</h5>
                    <p className="text-muted-foreground">
                      Face away from high-traffic areas, use noise-canceling headphones, and keep 
                      personal items that might distract you out of sight during work hours.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Digital Environment</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Technology Setup</h5>
                    <p className="text-muted-foreground">
                      Ensure reliable internet, have backup connectivity options, and keep all software 
                      updated. Technical issues can derail productivity and create stress.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Communication Tools</h5>
                    <p className="text-muted-foreground">
                      Master video conferencing platforms, instant messaging, and project management 
                      tools. Efficient communication is crucial for remote work success.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Digital Organization</h5>
                    <p className="text-muted-foreground">
                      Maintain organized digital folders, use cloud storage effectively, and establish 
                      naming conventions for files to reduce time searching for documents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Management Strategies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Advanced Time Management for Remote Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">The Remote Work Pomodoro Method</h4>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary mb-1">25 min</div>
                      <div className="text-xs">Deep Work</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600 mb-1">5 min</div>
                      <div className="text-xs">Quick Break</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600 mb-1">50 min</div>
                      <div className="text-xs">Focus Block</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600 mb-1">15 min</div>
                      <div className="text-xs">Active Break</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600 mb-1">Repeat</div>
                      <div className="text-xs">3-4 Cycles</div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Use our timer to maintain these intervals. The key is consistency—your brain will adapt 
                  to these rhythms and enter focus mode more quickly over time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Time Blocking Strategies</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <h5 className="font-medium text-blue-900">Deep Work Blocks (2-4 hours)</h5>
                      <p className="text-blue-700 text-xs">Complex projects, strategic thinking, creative work</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                      <h5 className="font-medium text-green-900">Communication Blocks (30-60 min)</h5>
                      <p className="text-green-700 text-xs">Emails, calls, team check-ins, quick responses</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <h5 className="font-medium text-yellow-900">Admin Time (30-45 min)</h5>
                      <p className="text-yellow-700 text-xs">Scheduling, filing, expense reports, planning</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Energy Management</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="font-medium">Identify Your Peak Hours</h5>
                      <p className="text-muted-foreground">
                        Track your energy levels throughout the day for a week. Schedule your most 
                        important work during your natural peak performance times.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium">Match Tasks to Energy</h5>
                      <p className="text-muted-foreground">
                        Do creative or complex work when energy is high, and routine tasks when 
                        energy is lower. This maximizes overall productivity.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium">Protect Your Prime Time</h5>
                      <p className="text-muted-foreground">
                        Block your peak hours for important work. Don't schedule meetings or check 
                        email during these crucial productivity periods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placement */}
        <div className="mb-8">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Communication and Collaboration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Effective Remote Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Meeting Optimization</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• <strong>Batch meetings:</strong> Group similar meetings together to minimize context switching</p>
                    <p>• <strong>Set clear agendas:</strong> Share objectives and time limits beforehand</p>
                    <p>• <strong>Use standing meetings:</strong> Keep them short and focused (15-30 minutes)</p>
                    <p>• <strong>Record important sessions:</strong> For team members in different time zones</p>
                    <p>• <strong>Take breaks between meetings:</strong> Use our timer for 5-10 minute buffers</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Asynchronous Communication</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• <strong>Document decisions:</strong> Keep written records of important discussions</p>
                    <p>• <strong>Set response expectations:</strong> Clarify when immediate vs. delayed responses are needed</p>
                    <p>• <strong>Use status updates:</strong> Regular check-ins without meetings</p>
                    <p>• <strong>Share work in progress:</strong> Keep teammates informed of your progress</p>
                    <p>• <strong>Time zone awareness:</strong> Use our world clock for global team coordination</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Building Virtual Relationships</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Remote work can be isolating. Intentionally building relationships with colleagues 
                  improves collaboration, job satisfaction, and career development.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Daily Interactions</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Morning check-ins</li>
                      <li>• Casual chat channels</li>
                      <li>• Virtual coffee breaks</li>
                      <li>• End-of-day wrap-ups</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Team Building</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Virtual lunch meetings</li>
                      <li>• Online game sessions</li>
                      <li>• Show and tell meetings</li>
                      <li>• Skill sharing sessions</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Professional Growth</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• One-on-one mentoring</li>
                      <li>• Cross-team collaborations</li>
                      <li>• Knowledge sharing sessions</li>
                      <li>• Virtual conference attendance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work-Life Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Maintaining Work-Life Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm">Clear Boundaries</h5>
                <p className="text-muted-foreground text-xs mb-2">
                  Set specific work hours and stick to them. Use our alarm to signal start and end times.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Create a shutdown ritual to end your workday</li>
                  <li>• Change clothes to signal work-to-home transition</li>
                  <li>• Use separate devices or accounts for work and personal activities</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm">Physical Wellness</h5>
                <p className="text-muted-foreground text-xs mb-2">
                  Remote work can lead to sedentary behavior. Schedule regular movement breaks.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Take a 5-minute walk every hour</li>
                  <li>• Do desk stretches during short breaks</li>
                  <li>• Eat meals away from your workspace</li>
                  <li>• Get natural light daily, especially in the morning</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-primary" />
                Sustaining Long-term Productivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-semibold text-sm">Preventing Burnout</h5>
                <p className="text-muted-foreground text-xs mb-2">
                  Remote workers often work longer hours than office workers. Monitor your workload.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Track actual hours worked using our stopwatch</li>
                  <li>• Take real lunch breaks away from your screen</li>
                  <li>• Use all available vacation time</li>
                  <li>• Say no to non-essential requests</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-sm">Continuous Improvement</h5>
                <p className="text-muted-foreground text-xs mb-2">
                  Regularly assess and adjust your remote work strategies for optimal results.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Weekly productivity reviews</li>
                  <li>• Experiment with new tools and techniques</li>
                  <li>• Seek feedback from colleagues and managers</li>
                  <li>• Invest in professional development</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mb-8 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Transform Your Remote Work Experience</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start implementing these strategies gradually. Use our timing tools to establish 
              better work rhythms and maintain focus throughout your remote workday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/timer">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Set Up Work Timers
                </button>
              </Link>
              <Link href="/world-clock">
                <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold">
                  View World Clock
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
            More Productivity Tips →
          </Link>
        </div>

      </main>
    </div>
  );
}
