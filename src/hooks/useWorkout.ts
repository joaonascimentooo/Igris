
import { useState, useCallback } from 'react';
import { Workout, WorkoutExercise } from '@/types';
import { useAuth } from './useAuth';

export const useWorkout = () => {
  const { user } = useAuth();
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startWorkout = useCallback(() => {
    if (!user) {
      setError('Usuário não autenticado');
      return;
    }

    const newWorkout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      routineId: '',
      exercises: [],
      startedAt: new Date(),
    };

    setCurrentWorkout(newWorkout);
    setError(null);
  }, [user]);

  const addExercise = useCallback((exerciseName: string) => {
    if (!currentWorkout) {
      setError('Nenhum treino em progresso');
      return;
    }

    const newExercise: WorkoutExercise = {
      id: Math.random().toString(36).substr(2, 9),
      exerciseId: Math.random().toString(36).substr(2, 9),
      exerciseName,
      completedSets: [{ setNumber: 1, reps: 0, weight: 0 }],
    };

    setCurrentWorkout({
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, newExercise],
    });
  }, [currentWorkout]);

  const removeExercise = useCallback((exerciseId: string) => {
    if (!currentWorkout) return;

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter((e) => e.id !== exerciseId),
    });
  }, [currentWorkout]);

  const completeWorkout = useCallback(async () => {
    if (!currentWorkout || currentWorkout.exercises.length === 0) {
      setError('Nenhum exercício no treino');
      return;
    }

    try {
      setIsLoading(true);
      const completedWorkout: Workout = {
        ...currentWorkout,
        endedAt: new Date(),
      };

      setWorkouts([...workouts, completedWorkout]);
      setCurrentWorkout(null);
      setError(null);

      return completedWorkout.exercises.length * 10;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao completar treino';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkout, workouts]);

  const cancelWorkout = useCallback(() => {
    setCurrentWorkout(null);
    setError(null);
  }, []);

  return {
    currentWorkout,
    workouts,
    isLoading,
    error,
    startWorkout,
    addExercise,
    removeExercise,
    completeWorkout,
    cancelWorkout,
  };
};
