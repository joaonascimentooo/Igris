/**
 * Hook customizado para gerenciar rotinas
 */
import { useEffect } from 'react';
import { useRoutineStore } from '@/store';
import { routineService } from '@/lib/firebase/firestore.service';
import { Routine } from '@/types';

export const useRoutines = (userId: string | null) => {
  const { routines, currentRoutine, isLoading, error, setRoutines, setCurrentRoutine, setIsLoading, setError } =
    useRoutineStore();

  /**
   * Carrega rotinas do usuário
   */
  const loadRoutines = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const userRoutines = await routineService.getRoutinesByUser(userId);
      setRoutines(userRoutines);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load routines';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRoutines();
  }, [userId]);

  const createRoutine = async (routine: Omit<Routine, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!userId) throw new Error('User not authenticated');
    try {
      const routineId = `routine_${Date.now()}`;
      await routineService.createRoutine(routineId, {
        ...routine,
        userId,
      });
      await loadRoutines();
      return routineId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create routine';
      setError(message);
      throw err;
    }
  };

  const updateRoutine = async (routineId: string, updates: Partial<Routine>) => {
    try {
      await routineService.updateRoutine(routineId, updates);
      await loadRoutines();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update routine';
      setError(message);
      throw err;
    }
  };

  const deleteRoutine = async (routineId: string) => {
    try {
      await routineService.deleteRoutine(routineId);
      await loadRoutines();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete routine';
      setError(message);
      throw err;
    }
  };

  const selectRoutine = (routine: Routine | null) => {
    setCurrentRoutine(routine);
  };

  return {
    routines,
    currentRoutine,
    isLoading,
    error,
    loadRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    selectRoutine,
  };
};
