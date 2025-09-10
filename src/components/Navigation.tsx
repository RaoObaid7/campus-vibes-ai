import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Calendar, Users, BookOpen, MessageSquare } from 'lucide-react';
import { useThemeContext } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useThemeContext();

  const navItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'my-events', label: 'My Events', icon: BookOpen },
    { id: 'feed', label: 'Feed', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: Users },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-campus-primary to-campus-secondary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-campus-primary to-campus-secondary bg-clip-text text-transparent">
              CampusConnect+
            </h1>
          </motion.div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'campus' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className="relative"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-campus-primary to-campus-secondary rounded-md -z-10"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden mt-4 flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'campus' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex-col h-auto py-2"
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};