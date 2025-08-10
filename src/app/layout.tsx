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
        url: '/og-image.png',
        width: 1200,
        height: 630,
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
    images: ['/og-image.png'],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "wklock",
              "description": "Free online clock, alarm, timer, and stopwatch with customizable displays and world time support.",
              "url": "https://wklock.com",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Digital Clock",
                "Analog Clock", 
                "Text Clock",
                "Alarm Clock",
                "Countdown Timer",
                "Stopwatch",
                "World Clock",
                "Holiday Countdowns"
              ],
               "author": {
                 "@type": "Organization",
                 "name": "wklock"
               }
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
