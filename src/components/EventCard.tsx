import React from 'react';
import { Event } from '@/types/event';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryColors } from '@/lib/mockData';

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onRegister, 
  onViewDetails, 
  isRegistered = false 
}) => {
  const progressPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  const categoryColor = categoryColors[event.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              variant="secondary" 
              className={`bg-${categoryColor}/10 text-${categoryColor} border-${categoryColor}/20`}
            >
              {event.category}
            </Badge>
            <div className="text-right">
              <div className="flex items-center text-muted-foreground text-sm">
                <Users className="w-4 h-4 mr-1" />
                {event.currentParticipants}/{event.maxParticipants}
              </div>
              <div className="w-20 bg-muted rounded-full h-1.5 mt-1">
                <div 
                  className={`bg-${categoryColor} h-1.5 rounded-full transition-all duration-300`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
          <CardTitle className="text-lg font-bold leading-tight">
            {event.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {event.venue}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2 mt-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(event.id)}
              className="flex-1"
            >
              View Details
            </Button>
            <Button 
              variant={isRegistered ? "secondary" : "campus"}
              size="sm" 
              onClick={() => onRegister(event.id)}
              disabled={isRegistered || event.currentParticipants >= event.maxParticipants}
              className="flex-1"
            >
              {isRegistered ? 'Registered' : 'Register'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};