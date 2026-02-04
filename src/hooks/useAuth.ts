/**
 * Hook customizado para autenticação
 * Encapsula lógica de auth com Zustand
 */
import { useEffect } from 'react';
import { useAuthStore } from '@/store';
import { authService } from '@/lib/firebase/auth.service';
import { userService } from '@/lib/firebase/firestore.service';
import { User } from '@/types';

const isFirebaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
};

export const useAuth = () => {
  const { user, isLoading, error, setUser, setIsLoading, setError, reset } = useAuthStore();

 
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setError('Firebase não está configurado. Veja QUICKSTART.md para setup.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await userService.getUserById(firebaseUser.uid);
          if (userData) {
            setUser(userData);
          } else {
            // Cria registro de novo usuário se não existir
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              photoURL: firebaseUser.photoURL || undefined,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            await userService.createUser(firebaseUser.uid, newUser);
            setUser(newUser);
          }
        } else {
          reset();
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch user data';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, name: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const firebaseUser = await authService.register(email, password);
      const newUser: User = {
        id: firebaseUser.uid,
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await userService.createUser(firebaseUser.uid, newUser);
      setUser(newUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }
    
    setIsLoading(true);
    setError(null);
    try {
      await authService.login(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }

    setIsLoading(true);
    setError(null);
    try {
      await authService.loginWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }

    setIsLoading(true);
    setError(null);
    try {
      await authService.loginWithApple();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Apple login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    loginWithGoogle,
    loginWithApple,
    isAuthenticated: !!user,
  };
};
