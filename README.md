# �� WKClock - Online Clock, Timer & Stopwatch

A modern, feature-rich web application providing clock, timer, stopwatch, and alarm functionality with Google AdSense integration.

## ✨ Features

- **Multiple Clock Modes**: Digital, Analog, and Text displays
- **Customizable**: Colors, sizes, fonts, and show/hide seconds
- **World Clock**: Support for multiple timezones
- **Timer**: Countdown timer with holiday-specific countdowns
- **Stopwatch**: Precision stopwatch with lap functionality
- **Alarm Clock**: Sound alerts with custom times
- **Responsive Design**: Works on desktop and mobile
- **Dark Mode**: Beautiful dark theme
- **PWA Ready**: Progressive Web App capabilities
- **SEO Optimized**: Comprehensive meta tags and sitemap
- **AdSense Integration**: Monetization with Google AdSense

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Deployment**: PM2, Nginx

## 🚀 Quick Start

### Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/wklock.git
cd wklock

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your AdSense credentials

# Start development server
npm run dev
```

### Production Deployment

1. **Setup Environment Variables**
   ```bash
   # Create .env.local with your AdSense configuration
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_HOME=XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_WORLD=XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_ALARM=XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_TIMER=XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_STOPWATCH=XXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_HOLIDAY=XXXXXXXXXX
   ```

2. **Build and Deploy**
   ```bash
   # Build the application
   npm run build

   # Start with PM2 (production)
   pm2 start npm --name "wklock-frontend" -- start -- -p 3010
   ```

3. **Automated Deployment**
   ```bash
   # Make deployment script executable and run
   chmod +x deploy.sh
   ./deploy.sh
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [holiday]/[year]/   # Holiday countdown pages
│   ├── alarm/              # Alarm clock page
│   ├── stopwatch/          # Stopwatch page
│   ├── timer/              # Timer pages
│   └── world-clock/        # World clock pages
├── components/             # React components
│   ├── clocks/            # Clock display components
│   ├── ui/                # UI components (shadcn/ui)
│   └── ...                # Feature components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── adsense.ts         # AdSense integration
│   ├── city-timezones.ts  # Timezone data
│   └── ...                # Other utilities
public/                    # Static assets
docs/                      # Documentation
```

## 🌐 Live Demo

Visit: [https://wklock.com](https://wklock.com)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense client ID | Yes |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` | AdSense slot for home page | No |
| `NEXT_PUBLIC_ADSENSE_SLOT_WORLD` | AdSense slot for world clock | No |
| `NEXT_PUBLIC_ADSENSE_SLOT_ALARM` | AdSense slot for alarm page | No |
| `NEXT_PUBLIC_ADSENSE_SLOT_TIMER` | AdSense slot for timer page | No |
| `NEXT_PUBLIC_ADSENSE_SLOT_STOPWATCH` | AdSense slot for stopwatch | No |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOLIDAY` | AdSense slot for holiday pages | No |

## 📱 Pages

- **/** - Main clock with customizable display
- **/world-clock** - World clock with timezone selection
- **/world-clock/[city]** - Specific city time
- **/alarm** - Alarm clock functionality
- **/timer** - Countdown timer
- **/timer/[holiday]** - Holiday countdown timers
- **/stopwatch** - Precision stopwatch with laps
- **/[holiday]/[year]** - Holiday-specific countdown pages

## 🎨 Customization

The application supports extensive customization:
- **Clock Mode**: Digital, Analog, Text
- **Colors**: Custom color picker
- **Size**: Adjustable clock size (50% - 200%)
- **Font Family**: Multiple font options
- **Show Seconds**: Toggle seconds display
- **Themes**: Dark/Light mode support

## 🔄 Deployment Workflow

1. **Make changes locally**
2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Deploy to VPS**
   ```bash
   ./deploy.sh
   ```

## 📋 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, please open an issue on GitHub or contact the development team.
