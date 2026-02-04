/**
 * Página de Registro
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { Input, Button } from '@/components/Common';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = 'Nome é obrigatório';
    if (!formData.email) errors.email = 'Email é obrigatório';
    if (!formData.password) errors.password = 'Senha é obrigatória';
    if (formData.password.length < 6) errors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Senhas não correspondem';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      router.push('/dashboard');
    } catch {
      // Erro já está no state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-md">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg p-lg border border-gray-700">
          <h1 className="text-3xl font-bold text-primary text-center mb-lg">💪 Gym Routine</h1>

          <form onSubmit={handleSubmit} className="space-y-md">
            <Input
              name="name"
              type="text"
              label="Nome"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
            />

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

            <Input
              name="confirmPassword"
              type="password"
              label="Confirmar Senha"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={validationErrors.confirmPassword}
            />

            {error && <div className="p-md bg-red-900 text-red-300 rounded text-sm">{error}</div>}

            <Button type="submit" isLoading={isLoading} className="w-full">
              Cadastrar
            </Button>
          </form>

          <div className="mt-lg text-center">
            <p className="text-light mb-md">
              Já tem conta?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
