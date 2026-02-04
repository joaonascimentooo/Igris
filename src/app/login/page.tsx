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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text mb-2">
            igris
          </h1>
          <p className="text-gray-300 text-xs tracking-widest font-semibold">SEU ASSISTENTE DE TREINO</p>
        </div>

        {/* Card Principal */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-gray-400 text-sm mb-8">Acesse sua conta com Google, Apple ID ou email</p>

          {isFirebaseError && (
            <div className="p-4 bg-red-900/30 text-red-300 rounded-xl text-sm mb-6 border border-red-600/50">
              <p className="font-semibold mb-1">⚠️ Firebase não configurado</p>
              <p className="text-xs mb-3 opacity-90">Siga o guia em <code className="bg-black/50 px-2 py-1 rounded text-xs">QUICKSTART.md</code></p>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold transition"
              >
                Acesse Firebase Console →
              </a>
            </div>
          )}

          {/* Botões Sociais */}
          <div className="space-y-3 mb-8">
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-3 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20">
              <span className="text-xl">🔵</span>
              <span>Continuar com Google</span>
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-3 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20">
              <span className="text-xl">🍎</span>
              <span>Continuar com Apple</span>
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
                type="email"
                name="email"
                placeholder="Email ou username"
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
                  placeholder="Senha"
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

            {error && !isFirebaseError && (
              <div className="p-3 bg-red-900/30 text-red-300 rounded-xl text-sm border border-red-600/50">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold py-3 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
            <Link
              href="/register"
              className="text-cyan-400 hover:text-cyan-300 transition font-semibold"
            >
              Criar conta
            </Link>
            <button className="text-gray-400 hover:text-gray-300 transition font-medium">
              Esqueci a senha
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-gray-600 text-xs mt-8 font-medium">© 2026 igris. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default LoginPage;
