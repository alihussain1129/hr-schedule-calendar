export type ViewMode = 'day' | 'week' | 'month' | 'years';

export type EventTab = 'description' | 'assigned';

export type ParticipantStatus = 'accepted' | 'rejected' | 'pending';

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  status: ParticipantStatus;
}

export interface Attachment {
  name: string;
  size: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  dayIndex: number;
  icon: 'video' | 'users' | 'coffee' | 'calendar';
  description?: string;
  links?: { label: string; url: string }[];
  attachments?: Attachment[];
  participants?: Participant[];
  actionLabel?: string;
  actionType?: 'meeting' | 'location';
  hasReminder?: boolean;
}
