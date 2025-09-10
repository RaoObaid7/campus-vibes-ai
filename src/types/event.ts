export type EventCategory = 'Workshop' | 'Seminar' | 'Sports' | 'Tech' | 'Social' | 'Academic';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  maxParticipants: number;
  currentParticipants: number;
  tags: string[];
  image?: string;
  organizer: string;
}

export interface EventRegistration {
  eventId: string;
  userId: string;
  registeredAt: string;
  qrCode: string;
  checkedIn: boolean;
  checkedInAt?: string;
}

export interface EventFeedback {
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  submittedAt: string;
}

export interface EventComment {
  id: string;
  eventId: string;
  userId: string;
  username: string;
  comment: string;
  reactions: { [emoji: string]: number };
  createdAt: string;
}

export interface UserPreferences {
  favoriteCategories: EventCategory[];
  interests: string[];
  notificationSettings: {
    eventReminders: boolean;
    recommendations: boolean;
    social: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  preferences: UserPreferences;
  avatar?: string;
}