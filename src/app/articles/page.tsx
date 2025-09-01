import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { getSlotForPlacement } from '@/lib/adsense';
import { Clock, Calendar, Timer, AlarmClock, BookOpen, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Management Articles & Productivity Tips | WKClock',
  description: 'Expert time management articles, productivity techniques, and practical tips. Learn Pomodoro technique, work-from-home strategies, and effective time tracking methods.',
  keywords: 'time management, productivity tips, Pomodoro technique, work from home, time tracking, focus techniques, study tips, productivity articles',
  openGraph: {
    title: 'Time Management Articles & Productivity Tips',
    description: 'Expert insights and practical strategies to help you master time and boost productivity.',
    type: 'website',
  },
};

const articles = [
  {
    id: 'time-management-students',
    title: 'Essential Time Management Tips for Students',
    excerpt: 'Discover proven strategies to balance studies, work, and personal life effectively using time-tracking tools.',
    category: 'Education',
    icon: BookOpen,
    readTime: '8 min read',
    tags: ['productivity', 'students', 'study-tips']
  },
  {
    id: 'productivity-work-from-home',
    title: 'Boosting Productivity While Working from Home',
    excerpt: 'Learn how to create effective routines and use timing techniques to stay focused in remote work environments.',
    category: 'Productivity',
    icon: Briefcase,
    readTime: '10 min read',
    tags: ['remote-work', 'productivity', 'focus']
  },
  {
    id: 'pomodoro-technique-guide',
    title: 'The Complete Guide to the Pomodoro Technique',
    excerpt: 'Master this time management method with detailed instructions, variations, and digital tools to maximize efficiency.',
    category: 'Techniques',
    icon: Timer,
    readTime: '12 min read',
    tags: ['pomodoro', 'focus', 'time-blocking']
  },
  {
    id: 'teaching-time-kids',
    title: 'Teaching Kids to Tell Time: A Parent\'s Guide',
    excerpt: 'Fun and effective methods to help children learn analog and digital time reading with interactive activities.',
    category: 'Education',
    icon: Users,
    readTime: '7 min read',
    tags: ['children', 'education', 'parenting']
  },
  {
    id: 'optimal-sleep-schedule',
    title: 'Creating an Optimal Sleep Schedule for Better Health',
    excerpt: 'Understand circadian rhythms and build healthy sleep habits using consistent timing and alarm strategies.',
    category: 'Health',
    icon: AlarmClock,
    readTime: '9 min read',
    tags: ['sleep', 'health', 'routine']
  },
  {
    id: 'time-zones-business',
    title: 'Managing Time Zones in Global Business',
    excerpt: 'Navigate international meetings and deadlines with tools and strategies for cross-timezone collaboration.',
    category: 'Business',
    icon: Clock,
    readTime: '11 min read',
    tags: ['business', 'global', 'meetings']
  }
];

export default function ArticlesPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
      <Navigation />
      <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8 pt-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Time Management Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, practical tips, and proven strategies to help you master time and boost productivity.
          </p>
        </div>

        {/* Ad Placement */}
        <div className="mb-12">
          <AdPlaceholder slot={getSlotForPlacement('home')} />
        </div>

        {/* Featured Article */}
        <Card className="mb-12 border-primary/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Timer className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">Featured</Badge>
                <h2 className="text-2xl font-bold mb-3">The Complete Guide to the Pomodoro Technique</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique has become one of the most 
                  popular time management methods worldwide. Learn how to implement this simple yet powerful technique 
                  using our online timer tools to transform your productivity and focus.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>12 min read</span>
                  <span>•</span>
                  <span>Techniques</span>
                  <span>•</span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">pomodoro</Badge>
                    <Badge variant="outline" className="text-xs">focus</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => {
            const IconComponent = article.icon;
            return (
              <Card key={article.id} className="transition-all duration-200 hover:shadow-lg hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.readTime}</span>
                    <div className="flex gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ad Placement */}
        <div className="mb-12">
          <AdPlaceholder slot={getSlotForPlacement('timer')} />
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Education', 'Productivity', 'Business', 'Health'].map((category) => (
              <Card key={category} className="text-center p-4 hover:bg-muted/50 transition-colors">
                <CardContent className="p-0">
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {articles.filter(a => a.category === category).length} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="mb-12 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest time management tips, productivity techniques, and tool updates 
              delivered straight to your inbox. Join thousands of professionals who trust our insights.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
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
