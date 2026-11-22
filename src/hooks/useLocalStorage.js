import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage persistence
 * Handles serialization, parsing, and error handling
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass lazy initializer function to useState so the logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook specifically for task management with localStorage
 */
export function useTasks(initialTasks) {
  const [tasks, setTasks, removeTasks] = useLocalStorage('focusboard_tasks', initialTasks);

  const addTask = useCallback((task) => {
    setTasks((prev) => [...prev, task]);
  }, [setTasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }, [setTasks]);

  return [
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    removeTasks
  ];
}