/**
 * Tipos globais da aplicação
 * Utilizados em todo o projeto
 */

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Routine {
  id: string;
  userId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight?: number;
  unit?: 'kg' | 'lb';
  restSeconds: number;
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  routineId: string;
  exercises: WorkoutExercise[];
  startedAt: Date;
  endedAt?: Date;
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  completedSets: CompletedSet[];
  notes?: string;
}

export interface CompletedSet {
  setNumber: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface ProgressMetrics {
  userId: string;
  totalWorkouts: number;
  totalExercises: number;
  averageSessionDuration: number;
  lastWorkoutDate: Date;
  personalRecords: PersonalRecord[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  maxWeight: number;
  maxReps: number;
  date: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};
