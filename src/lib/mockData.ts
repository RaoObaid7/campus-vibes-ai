import { Event, EventCategory } from '@/types/event';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Learn the fundamentals of AI and machine learning with hands-on coding exercises. Perfect for beginners and intermediate students.',
    date: '2024-03-15',
    time: '14:00',
    venue: 'Computer Science Lab A',
    category: 'Tech',
    maxParticipants: 30,
    currentParticipants: 23,
    tags: ['AI', 'Machine Learning', 'Python', 'Programming'],
    organizer: 'CS Department'
  },
  {
    id: '2',
    title: 'Campus Basketball Tournament',
    description: 'Annual inter-department basketball championship. Registration closes soon!',
    date: '2024-03-18',
    time: '16:00',
    venue: 'Main Sports Arena',
    category: 'Sports',
    maxParticipants: 64,
    currentParticipants: 45,
    tags: ['Basketball', 'Tournament', 'Inter-department'],
    organizer: 'Sports Committee'
  },
  {
    id: '3',
    title: 'Digital Marketing Seminar',
    description: 'Industry experts share insights on modern digital marketing strategies and social media management.',
    date: '2024-03-20',
    time: '10:00',
    venue: 'Business School Auditorium',
    category: 'Seminar',
    maxParticipants: 100,
    currentParticipants: 67,
    tags: ['Marketing', 'Digital', 'Business', 'Career'],
    organizer: 'Business School'
  },
  {
    id: '4',
    title: 'Creative Writing Workshop',
    description: 'Enhance your writing skills with published authors. Bring your creative pieces for feedback.',
    date: '2024-03-22',
    time: '15:30',
    venue: 'Library Conference Room',
    category: 'Workshop',
    maxParticipants: 20,
    currentParticipants: 14,
    tags: ['Writing', 'Creative', 'Literature'],
    organizer: 'English Department'
  },
  {
    id: '5',
    title: 'Cultural Night 2024',
    description: 'Celebrate diversity with performances, food, and cultural exhibitions from around the world.',
    date: '2024-03-25',
    time: '18:00',
    venue: 'Main Campus Grounds',
    category: 'Social',
    maxParticipants: 500,
    currentParticipants: 234,
    tags: ['Culture', 'Performance', 'Food', 'International'],
    organizer: 'Student Union'
  },
  {
    id: '6',
    title: 'Quantum Physics Symposium',
    description: 'Deep dive into quantum mechanics and its applications in modern technology.',
    date: '2024-03-28',
    time: '11:00',
    venue: 'Physics Department',
    category: 'Academic',
    maxParticipants: 50,
    currentParticipants: 28,
    tags: ['Physics', 'Quantum', 'Science', 'Research'],
    organizer: 'Physics Department'
  }
];

export const categoryColors: Record<EventCategory, string> = {
  'Tech': 'tech',
  'Sports': 'sports',
  'Workshop': 'workshop',
  'Seminar': 'seminar',
  'Social': 'campus-primary',
  'Academic': 'campus-secondary'
};

// Mock API functions
export const fetchEvents = async (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 500);
  });
};

export const searchEvents = async (query: string): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockEvents.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(filtered);
    }, 300);
  });
};

export const filterEventsByCategory = (events: Event[], category: EventCategory | 'All'): Event[] => {
  if (category === 'All') return events;
  return events.filter(event => event.category === category);
};

export const sortEvents = (events: Event[], sortBy: 'date' | 'popularity' | 'newest'): Event[] => {
  const sorted = [...events];
  
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case 'popularity':
      return sorted.sort((a, b) => b.currentParticipants - a.currentParticipants);
    case 'newest':
      return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    default:
      return sorted;
  }
};