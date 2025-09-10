import React, { useState, useEffect, useMemo } from 'react';
import { Event, EventCategory } from '@/types/event';
import { EventCard } from '@/components/EventCard';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { EventDetail } from '@/components/EventDetail';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistrations } from '@/hooks/useLocalStorage';
import { mockEvents, searchEvents, filterEventsByCategory, sortEvents } from '@/lib/mockData';

interface EventListProps {
  onRegister: (eventId: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ onRegister }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'newest'>('date');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrations] = useRegistrations();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        let eventData = mockEvents;
        
        if (searchQuery) {
          eventData = await searchEvents(searchQuery);
        }
        
        const filtered = filterEventsByCategory(eventData, selectedCategory);
        const sorted = sortEvents(filtered, sortBy);
        
        setEvents(sorted);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [searchQuery, selectedCategory, sortBy]);

  const handleViewDetails = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleRegister = (eventId: string) => {
    onRegister(eventId);
    setSelectedEvent(null);
  };

  const getRegistration = (eventId: string) => {
    return registrations.find((reg: any) => reg.eventId === eventId) || null;
  };

  const handleCheckIn = (eventId: string) => {
    // This would typically call a check-in API
    console.log('Checking in to event:', eventId);
    // For demo purposes, we'll just log it
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-muted/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <AnimatePresence mode="wait">
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search or filters' : 'Check back later for new events'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`${searchQuery}-${selectedCategory}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard
                  event={event}
                  onRegister={handleRegister}
                  onViewDetails={handleViewDetails}
                  isRegistered={registrations.some((reg: any) => reg.eventId === event.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <EventDetail
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={handleRegister}
        registration={selectedEvent ? getRegistration(selectedEvent.id) : null}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
};