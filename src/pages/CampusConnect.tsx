import React, { useState, useEffect } from 'react';
import { EventList } from '@/components/EventList';
import { Navigation } from '@/components/Navigation';
import { useRegistrations } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';

export const CampusConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [registrations, setRegistrations] = useRegistrations();
  const { toast } = useToast();

  const handleRegister = async (eventId: string) => {
    try {
      // Check if already registered
      const existingRegistration = registrations.find((reg: any) => reg.eventId === eventId);
      if (existingRegistration) {
        toast({
          title: "Already Registered",
          description: "You're already registered for this event.",
          variant: "destructive"
        });
        return;
      }

      // Generate QR code
      const qrData = `CampusConnect-${eventId}-${Date.now()}`;
      const qrCode = await QRCode.toDataURL(qrData);

      // Create registration
      const newRegistration = {
        eventId,
        userId: 'user-123', // In a real app, this would come from auth
        registeredAt: new Date().toISOString(),
        qrCode: qrData,
        checkedIn: false
      };

      setRegistrations([...registrations, newRegistration]);

      toast({
        title: "Registration Successful! 🎉",
        description: "You've been registered for the event. Check your QR code in event details.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventList onRegister={handleRegister} />;
      case 'my-events':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">My Events</h2>
            <p className="text-muted-foreground">
              You have {registrations.length} registered event{registrations.length !== 1 ? 's' : ''}
            </p>
          </div>
        );
      case 'feed':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Campus Feed</h2>
            <p className="text-muted-foreground">Social features coming soon!</p>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Profile & Preferences</h2>
            <p className="text-muted-foreground">Personalization features coming soon!</p>
          </div>
        );
      default:
        return <EventList onRegister={handleRegister} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {renderContent()}
      </motion.main>
    </div>
  );
};