import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Specific hooks for app data
export const useRegistrations = () => {
  return useLocalStorage('campusconnect_registrations', []);
};

export const useFeedback = () => {
  return useLocalStorage('campusconnect_feedback', []);
};

export const useComments = () => {
  return useLocalStorage('campusconnect_comments', []);
};

export const useUserPreferences = () => {
  return useLocalStorage('campusconnect_preferences', {
    favoriteCategories: [],
    interests: [],
    notificationSettings: {
      eventReminders: true,
      recommendations: true,
      social: true
    }
  });
};

export const useTheme = () => {
  return useLocalStorage('campusconnect_theme', 'light');
};