# HR Schedule Calendar

A responsive, interactive schedule calendar built with React and TypeScript — inspired by modern HR management dashboards.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

## Features

- **Week / Day / Month / Years views** — switch between calendar layouts
- **Interactive event cards** — Description & Assigned tabs, attachments, participant status
- **Create schedules** — click empty time slots or use the "+ Create schedule" button
- **Date navigation** — prev/next arrows and native date picker
- **Responsive design** — horizontal scroll on mobile, stacked header on small screens

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/Schedule/
│   ├── ScheduleCalendar.tsx   # Main container + create modal
│   ├── ScheduleHeader.tsx     # Date picker, view toggle, create button
│   ├── ScheduleGrid.tsx       # Day/Week/Month/Years grid views
│   ├── ScheduleEventCard.tsx  # Event cards with tabs
│   └── ScheduleCalendar.css
├── data/scheduleData.ts       # Sample events
├── types/schedule.ts          # TypeScript interfaces
└── utils/dateUtils.ts         # Date helpers
```

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)

## License

MIT
