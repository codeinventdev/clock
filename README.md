# wklock - Online Clock & Timer

A comprehensive, free online clock application featuring multiple clock displays, alarm functionality, countdown timers, stopwatch with laps, and world clock support.

## Features

- **Multiple Clock Displays**: Digital, analog, and text-based clock options
- **Alarm Clock**: Set multiple alarms with custom sounds and repeat options
- **Countdown Timer**: Customizable timers for any duration
- **Stopwatch**: Precision stopwatch with lap timing functionality
- **World Clock**: Current time in cities worldwide
- **Holiday Countdowns**: Built-in timers for major holidays
- **Customizable**: Font, color, and size settings
- **Responsive Design**: Works on all devices
- **PWA Support**: Install as a web app

## SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Canonical URLs**: Prevents duplicate content issues

## Pages

- `/` - Main clock display with settings
- `/alarm` - Alarm clock functionality
- `/timer` - Countdown timer
- `/stopwatch` - Stopwatch with laps
- `/world-clock` - World time zones
- `/world-clock/[city]` - Specific city time
- `/timer/[holiday]` - Holiday countdown timers

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Google AdSense

To enable AdSense, set the client id as an environment variable:

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

Use the `AdPlaceholder` component and pass your slot id where ads should render. In development (or if not configured), a visual placeholder appears.

```tsx
<AdPlaceholder slot="1234567890" />
```

## SEO Optimization

The application includes:
- Dynamic sitemap generation
- Meta tags for all pages
- Open Graph and Twitter Card support
- Structured data markup
- PWA manifest for mobile optimization
- Responsive design for mobile-first indexing

## License

MIT License - Free to use and modify
