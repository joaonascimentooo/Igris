import { FirebaseOptions } from 'firebase/app';

/**
 * Utilitário para validar configurações do Firebase
 */
export const validateFirebaseConfig = (config: FirebaseOptions): boolean => {
  const requiredFields: (keyof FirebaseOptions)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  return requiredFields.every((field) => config[field]);
};

/**
 * Utilitário para formatar datas
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * Utilitário para formatar tempo
 */
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${secs}s`;
};

/**
 * Gera ID único
 */
export const generateId = (prefix: string = ''): string => {
  return `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calcula o total de peso em um treino
 */
export const calculateTotalVolume = (
  sets: number,
  reps: number,
  weight: number
): number => {
  return sets * reps * weight;
};
