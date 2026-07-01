import type { ScheduleEvent } from '../types/schedule';

function at(dayOffset: number, hour: number, minute = 0): Date {
  const base = new Date(2025, 1, 10);
  const d = new Date(base);
  d.setDate(base.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export const initialEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Meeting with Zoro',
    start: at(0, 8, 0),
    end: at(0, 10, 0),
    dayIndex: 0,
    icon: 'video',
    hasReminder: true,
    description:
      'Discuss the upcoming redesign project scope, timeline, and deliverables with the design team.',
    links: [
      { label: 'Figma — Redesign mockups', url: 'https://figma.com' },
    ],
    attachments: [{ name: 'Brief-of-redesign.pdf', size: '2.4 MB' }],
    participants: [
      {
        id: 'p1',
        name: 'Uchiha Sasuke',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasuke',
        status: 'accepted',
      },
      {
        id: 'p2',
        name: 'Roronoa Zoro',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoro',
        status: 'accepted',
      },
    ],
    actionLabel: 'Join Meeting Room',
    actionType: 'meeting',
  },
  {
    id: '2',
    title: 'Daily stand up',
    start: at(1, 9, 0),
    end: at(1, 9, 30),
    dayIndex: 1,
    icon: 'users',
    hasReminder: true,
    description: 'Quick sync on blockers and daily priorities.',
    actionLabel: 'Join Meeting Room',
    actionType: 'meeting',
  },
  {
    id: '3',
    title: 'Work from cafe',
    start: at(2, 8, 0),
    end: at(2, 11, 0),
    dayIndex: 2,
    icon: 'coffee',
    hasReminder: false,
    description: 'Remote work session at the downtown cafe.',
    participants: [
      {
        id: 'p3',
        name: 'Uchiha Sasuke',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sasuke',
        status: 'accepted',
      },
      {
        id: 'p4',
        name: 'Naruto Uzumaki',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto',
        status: 'rejected',
      },
      {
        id: 'p5',
        name: 'Sakura Haruno',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura',
        status: 'accepted',
      },
    ],
    actionLabel: 'View Location',
    actionType: 'location',
  },
  {
    id: '4',
    title: 'Design review',
    start: at(3, 14, 0),
    end: at(3, 15, 30),
    dayIndex: 3,
    icon: 'calendar',
    hasReminder: true,
    description: 'Review latest UI iterations with stakeholders.',
    actionLabel: 'Join Meeting Room',
    actionType: 'meeting',
  },
  {
    id: '5',
    title: 'Team lunch',
    start: at(4, 12, 0),
    end: at(4, 13, 0),
    dayIndex: 4,
    icon: 'coffee',
    description: 'Monthly team lunch at the rooftop restaurant.',
    actionLabel: 'View Location',
    actionType: 'location',
  },
];
