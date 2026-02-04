/**
 * Página de Registro
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { Input, Button } from '@/components/Common';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 13.5c-.29 3.47 2.87 4.66 2.91 4.66v.07c0 .35-.29 1.03-1.1 1.56-.74.51-1.88 1.05-3.34 1.05-2.57 0-4.33-1.53-5.46-3.01-.62-.81-1.13-1.59-1.48-2.16h-.5c-.6 0-1.17-.1-1.71-.3.02 1.26.44 2.45 1.26 3.37 1.16 1.3 3.04 2.34 5.69 2.34 1.62 0 2.98-.53 3.89-1.25.91-.72 1.5-1.78 1.5-2.7 0-1.56-1.04-2.83-2.97-3.81-.5-.26-.98-.48-1.39-.67.37-.25.78-.63 1.1-1.08.51-.71.86-1.68.86-2.76 0-3.59-3.23-6.51-7.23-6.51-4 0-7.23 2.92-7.23 6.51 0 1.78.74 3.39 2.01 4.56.86.78 1.91 1.37 3.07 1.73 1.32.41 2.75.54 4.2.38"/>
  </svg>
);

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register, loginWithGoogle, loginWithApple, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch {
    }
  };

  const handleAppleRegister = async () => {
    try {
      await loginWithApple();
      router.push('/dashboard');
    } catch {
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 overflow-hidden relative">
      {/* Efeito de fundo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="inline-block text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text mb-2">
            igris
          </h1>
          <p className="text-gray-300 text-xs tracking-widest font-semibold">SEU ASSISTENTE DE TREINO</p>
        </div>

        {/* Card Principal */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Criar Conta</h2>
          <p className="text-gray-400 text-sm mb-8">Comece sua jornada de fitness com igris</p>

          {/* Botões Sociais */}
          <div className="space-y-3 mb-8">
            <button 
              type="button"
              onClick={handleGoogleRegister}
              disabled={isLoading}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-3 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon />
              <span>Registrar com Google</span>
            </button>
            <button 
              type="button"
              disabled={true}
              className="w-full bg-white/10 border border-white/20 text-gray-500 py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
              title="Em breve"
            >
              <AppleIcon />
              <span>Registrar com Apple (em breve)</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <span className="text-gray-400 text-xs font-semibold">OU</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition duration-200 backdrop-blur-sm"
              />
              {validationErrors.name && (
                <p className="text-red-400 text-xs mt-2 font-semibold">{validationErrors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition duration-200 backdrop-blur-sm"
              />
              {validationErrors.email && (
                <p className="text-red-400 text-xs mt-2 font-semibold">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Senha (mín. 6 caracteres)"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition duration-200 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-red-400 text-xs mt-2 font-semibold">{validationErrors.password}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition duration-200 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-400 text-xs mt-2 font-semibold">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 text-red-300 rounded-xl text-sm border border-red-600/50">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              Já tem conta?{' '}
              <Link
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 transition font-semibold"
              >
                Faça login
              </Link>
            </p>
          </div>

          {/* Termos */}
          <p className="text-center text-gray-600 text-xs mt-4">
            Ao se registrar, você concorda com nossos{' '}
            <button className="text-cyan-400 hover:text-cyan-300 transition\">Termos de Serviço</button>
          </p>
        </div>

        {/* Rodapé */}
        <p className="text-center text-gray-600 text-xs mt-8 font-medium">© 2026 igris. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default RegisterPage;
