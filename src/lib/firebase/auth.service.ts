import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirebaseAuth } from './config';
import { ApiError } from '@/types';

export class AuthService {
  /**
   * Registra um novo usuário
   */
  async register(email: string, password: string): Promise<FirebaseUser> {
    try {
      const auth = getFirebaseAuth();
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      return credential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Faz login de um usuário
   */
  async login(email: string, password: string): Promise<FirebaseUser> {
    try {
      const auth = getFirebaseAuth();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<void> {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Escuta mudanças de autenticação
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Trata erros de autenticação
   */
  private handleAuthError(error: unknown): ApiError {
    const fbError = error as any;
    const code = fbError?.code || 'unknown_error';
    const message = fbError?.message || 'An error occurred during authentication';

    const errorMap: Record<string, string> = {
      'auth/email-already-in-use': 'Este email já está cadastrado',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/too-many-requests': 'Muitas tentativas de login. Tente novamente mais tarde',
    };

    return {
      code,
      message: errorMap[code] || message,
    };
  }
}

export const authService = new AuthService();
