import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ user: null, isLoading: false, error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

interface RoutineStore {
  routines: any[];
  currentRoutine: any | null;
  isLoading: boolean;
  error: string | null;
  setRoutines: (routines: any[]) => void;
  setCurrentRoutine: (routine: any | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRoutineStore = create<RoutineStore>((set) => ({
  routines: [],
  currentRoutine: null,
  isLoading: false,
  error: null,
  setRoutines: (routines) => set({ routines }),
  setCurrentRoutine: (currentRoutine) => set({ currentRoutine }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

interface WorkoutStore {
  currentWorkout: any | null;
  workoutHistory: any[];
  isTracking: boolean;
  setCurrentWorkout: (workout: any | null) => void;
  setWorkoutHistory: (history: any[]) => void;
  setIsTracking: (tracking: boolean) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  currentWorkout: null,
  workoutHistory: [],
  isTracking: false,
  setCurrentWorkout: (currentWorkout) => set({ currentWorkout }),
  setWorkoutHistory: (workoutHistory) => set({ workoutHistory }),
  setIsTracking: (isTracking) => set({ isTracking }),
}));
