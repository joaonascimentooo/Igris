/**
 * Página de Login
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { Input, Button } from '@/components/Common';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = 'Email é obrigatório';
    if (!formData.password) errors.password = 'Senha é obrigatória';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch {
      // Erro já está no state
    }
  };

  const isFirebaseError = error?.includes('Firebase não está configurado');

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-md">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg p-lg border border-gray-700">
          <h1 className="text-3xl font-bold text-primary text-center mb-lg">💪 Gym Routine</h1>

          {isFirebaseError && (
            <div className="p-md bg-yellow-900 text-yellow-300 rounded text-sm mb-lg border border-yellow-700">
              <p className="font-semibold mb-xs">⚠️ Firebase não configurado</p>
              <p className="text-xs mb-md">Siga o guia em <code className="bg-black px-xs py-xs rounded">QUICKSTART.md</code></p>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-200 hover:underline text-xs"
              >
                Acesse Firebase Console →
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-md">
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
            />

            <Input
              name="password"
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
            />

            {error && !isFirebaseError && (
              <div className="p-md bg-red-900 text-red-300 rounded text-sm">{error}</div>
            )}

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              disabled={isFirebaseError}
            >
              Entrar
            </Button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-light mb-md">
              Não tem conta?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
