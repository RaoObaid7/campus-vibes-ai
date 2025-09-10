import React, { useState } from 'react';
import { Event, EventRegistration } from '@/types/event';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, MapPin, Users, QrCode, Star } from 'lucide-react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import { categoryColors } from '@/lib/mockData';

interface EventDetailProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (eventId: string) => void;
  registration: EventRegistration | null;
  onCheckIn: (eventId: string) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({
  event,
  isOpen,
  onClose,
  onRegister,
  registration,
  onCheckIn
}) => {
  const [showQR, setShowQR] = useState(false);

  if (!event) return null;

  const categoryColor = categoryColors[event.category];
  const progressPercentage = (event.currentParticipants / event.maxParticipants) * 100;
  const isRegistered = !!registration;
  const canRegister = !isRegistered && event.currentParticipants < event.maxParticipants;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className={`bg-${categoryColor}/10 text-${categoryColor} border-${categoryColor}/20`}>
              {event.category}
            </Badge>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-4 h-4 mr-1" />
              {event.currentParticipants}/{event.maxParticipants} participants
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-1">
            <div 
              className={`bg-${categoryColor} h-2 rounded-md transition-all duration-500`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Event Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    {event.venue}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Organizer</h3>
                <p className="text-sm text-muted-foreground">{event.organizer}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {isRegistered && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-800 dark:text-green-200">
                          ✅ Registered
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          Registered on {new Date(registration.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQR(true)}
                        className="border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900/20"
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        QR Code
                      </Button>
                    </div>
                    {!registration.checkedIn && (
                      <Button
                        variant="campus"
                        size="sm"
                        onClick={() => onCheckIn(event.id)}
                        className="w-full mt-3"
                      >
                        Check In Now
                      </Button>
                    )}
                    {registration.checkedIn && (
                      <p className="text-sm text-green-600 dark:text-green-300 mt-2">
                        ✅ Checked in at {new Date(registration.checkedInAt!).toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {canRegister && (
              <Button
                variant="campus"
                onClick={() => onRegister(event.id)}
                className="flex-1"
              >
                Register for Event
              </Button>
            )}
          </div>
        </div>

        {/* QR Code Modal */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Event Check-in QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              {registration && (
                <div className="bg-white p-4 rounded-lg">
                  <QRCode value={registration.qrCode} size={200} />
                </div>
              )}
              <p className="text-sm text-muted-foreground text-center">
                Show this QR code at the event venue for check-in
              </p>
              <Button variant="outline" onClick={() => setShowQR(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};