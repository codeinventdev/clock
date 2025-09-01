import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SettingsProvider } from '@/context/settings-context';

export const metadata: Metadata = {
  title: 'Online Clock, Timer & Stopwatch | wklock',
  description: 'wklock: Your free online clock, alarm, timer, and stopwatch. Customize your clock display, set timers for any task, use the stopwatch with laps, and wake up with our reliable alarm clock. Explore world times and get inspired.',
  keywords: ['online clock', 'free clock', 'digital clock', 'analog clock', 'text clock', 'online timer', 'countdown timer', 'online stopwatch', 'lap timer', 'online alarm clock', 'world clock', 'time now', 'customizable clock', 'free timer', 'countdown', 'alarm clock online', 'world time', 'timezone converter', 'wkclock'],
  authors: [{ name: 'wklock' }],
  creator: 'wklock',
  publisher: 'wklock',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wklock.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Online Clock, Timer & Stopwatch | wklock',
    description: 'Free online clock, alarm, timer, and stopwatch with customizable displays and world time support.',
    url: 'https://wklock.com',
    siteName: 'wklock',
    images: [
      {
        url: '/favicon.svg',
        width: 800,
        height: 600,
        alt: 'wklock - Online Clock and Timer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Clock, Timer & Stopwatch | wklock',
    description: 'Free online clock, alarm, timer, and stopwatch with customizable displays and world time support.',
    images: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here', // Replace with actual Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto+Mono:wght@400;700&family=Orbitron:wght@400;700&family=Press+Start+2P&family=Share+Tech+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        <meta name="theme-color" content="#0F2D2E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="wklock" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta httpEquiv="content-language" content="en-US" />
        
        {/* Preconnect for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Additional PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="wklock" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "wklock - Online Clock & Timer",
              "alternateName": "wklock",
              "description": "Free online clock, alarm, timer, and stopwatch with customizable displays and world time support. Perfect for productivity, time management, and daily scheduling.",
              "url": "https://wklock.com",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "browserRequirements": "Requires modern web browser with JavaScript enabled",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "featureList": [
                "Customizable Digital Clock",
                "Analog Clock Display", 
                "Text Clock Format",
                "Multiple Alarm Clock",
                "Countdown Timer with Sound",
                "Precision Stopwatch with Laps",
                "World Clock with Time Zones",
                "Holiday Countdown Timers",
                "Pomodoro Timer",
                "Time Management Tools"
              ],
              "keywords": "online clock, digital clock, timer, stopwatch, alarm, world time, time management, productivity",
              "author": {
                "@type": "Organization",
                "name": "wklock",
                "url": "https://wklock.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "wklock",
                "url": "https://wklock.com"
              },
              "datePublished": "2025-01-01",
              "dateModified": new Date().toISOString().split('T')[0],
              "inLanguage": "en-US",
              "isAccessibleForFree": true,
              "usageInfo": "https://wklock.com/about",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "wklock Clock Tools",
                "applicationCategory": "Productivity",
                "operatingSystem": "Web-based"
              }
            })
          }}
        />
        
        {/* Additional Structured Data for Time Tools */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "wklock",
              "url": "https://wklock.com",
              "logo": "https://wklock.com/favicon.svg",
              "sameAs": [],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "knowsAbout": [
                "Time Management",
                "Productivity Tools",
                "Online Clocks",
                "Timer Applications",
                "Time Zone Conversion",
                "Pomodoro Technique"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased bg-background">
          <SettingsProvider>
              {children}
              <Toaster />
          </SettingsProvider>
      </body>
    </html>
  );
}
