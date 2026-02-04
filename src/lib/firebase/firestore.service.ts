import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Query,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseFirestore } from './config';
import { Routine, Workout, User } from '@/types';

/**
 * Serviço genérico para operações CRUD no Firestore
 */
export class FirestoreService {
  private db = getFirebaseFirestore();

  /**
   * Obtém um documento pelo ID
   */
  async getDocument<T extends DocumentData>(collectionName: string, docId: string): Promise<T | null> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as T) : null;
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Obtém todos os documentos de uma coleção com query opcional
   */
  async getDocuments<T extends DocumentData>(
    collectionName: string,
    queryConstraints?: (q: Query) => Query
  ): Promise<T[]> {
    try {
      let q = query(collection(this.db, collectionName));
      if (queryConstraints) {
        q = queryConstraints(q);
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo documento
   */
  async createDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: T
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const documentData = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await setDoc(docRef, documentData);
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Atualiza um documento
   */
  async updateDocument<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const updateData = {
        ...data,
        updatedAt: Timestamp.now(),
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Deleta um documento
   */
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      throw error;
    }
  }
}

/**
 * Serviço específico para operações com usuários
 */
export class UserService extends FirestoreService {
  private COLLECTION = 'users';

  async getUserById(userId: string): Promise<User | null> {
    return this.getDocument<User>(this.COLLECTION, userId);
  }

  async createUser(userId: string, userData: Partial<User>): Promise<void> {
    return this.createDocument(this.COLLECTION, userId, {
      id: userId,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    return this.updateDocument(this.COLLECTION, userId, userData);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.deleteDocument(this.COLLECTION, userId);
  }
}

/**
 * Serviço específico para operações com rotinas
 */
export class RoutineService extends FirestoreService {
  private COLLECTION = 'routines';

  async getRoutineById(routineId: string): Promise<Routine | null> {
    return this.getDocument<Routine>(this.COLLECTION, routineId);
  }

  async getRoutinesByUser(userId: string): Promise<Routine[]> {
    return this.getDocuments<Routine>(this.COLLECTION, () =>
      where('userId', '==', userId) as any
    );
  }

  async createRoutine(routineId: string, routine: Partial<Routine>): Promise<void> {
    return this.createDocument(this.COLLECTION, routineId, {
      id: routineId,
      ...routine,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Routine);
  }

  async updateRoutine(routineId: string, routine: Partial<Routine>): Promise<void> {
    return this.updateDocument(this.COLLECTION, routineId, routine);
  }

  async deleteRoutine(routineId: string): Promise<void> {
    return this.deleteDocument(this.COLLECTION, routineId);
  }
}

/**
 * Serviço específico para operações com workouts
 */
export class WorkoutService extends FirestoreService {
  private COLLECTION = 'workouts';

  async getWorkoutById(workoutId: string): Promise<Workout | null> {
    return this.getDocument<Workout>(this.COLLECTION, workoutId);
  }

  async getWorkoutsByUser(userId: string): Promise<Workout[]> {
    return this.getDocuments<Workout>(this.COLLECTION, () =>
      where('userId', '==', userId) as any
    );
  }

  async createWorkout(workoutId: string, workout: Partial<Workout>): Promise<void> {
    return this.createDocument(this.COLLECTION, workoutId, {
      id: workoutId,
      ...workout,
      startedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Workout);
  }

  async updateWorkout(workoutId: string, workout: Partial<Workout>): Promise<void> {
    return this.updateDocument(this.COLLECTION, workoutId, workout);
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    return this.deleteDocument(this.COLLECTION, workoutId);
  }
}

// Lazy initialization - só criar quando realmente usar
export const userService = new Proxy(new UserService(), {
  get(target, prop) {
    if (typeof target[prop as keyof UserService] === 'function') {
      return function (...args: any[]) {
        return (target[prop as keyof UserService] as any)(...args);
      };
    }
    return target[prop as keyof UserService];
  },
});

export const routineService = new Proxy(new RoutineService(), {
  get(target, prop) {
    if (typeof target[prop as keyof RoutineService] === 'function') {
      return function (...args: any[]) {
        return (target[prop as keyof RoutineService] as any)(...args);
      };
    }
    return target[prop as keyof RoutineService];
  },
});

export const workoutService = new Proxy(new WorkoutService(), {
  get(target, prop) {
    if (typeof target[prop as keyof WorkoutService] === 'function') {
      return function (...args: any[]) {
        return (target[prop as keyof WorkoutService] as any)(...args);
      };
    }
    return target[prop as keyof WorkoutService];
  },
});
