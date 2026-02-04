/**
 * Página Dashboard
 * Home principal após login
 */
'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/hooks';
import { Zap, BookOpen, Clock, Flame, Activity } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Treinos Esta Semana', value: '3', icon: Zap },
    { label: 'Horas Treinadas', value: '4.5h', icon: Clock },
    { label: 'Calorias Queimadas', value: '2,450', icon: Flame },
    { label: 'Sequência', value: '7 dias', icon: Activity },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text mb-4 inline-block">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-gray-300 text-lg">Vamos treinar hoje?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-cyan-500/30 shadow-lg hover:border-cyan-400/50 transition duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text mt-2">{stat.value}</p>
                  </div>
                  <Icon size={32} className="text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/workout" className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-cyan-500/30 shadow-lg hover:border-cyan-400/50 transition duration-200 cursor-pointer hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <Zap size={24} className="text-cyan-400" />
              <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">Iniciar Treino</h3>
            </div>
            <p className="text-gray-300 mb-4">Comece um treino com sua rotina atual</p>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition duration-200">
              Treinar Agora
            </button>
          </Link>

          <Link href="/routines" className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-cyan-500/30 shadow-lg hover:border-cyan-400/50 transition duration-200 cursor-pointer hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={24} className="text-cyan-400" />
              <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">Minhas Rotinas</h3>
            </div>
            <p className="text-gray-300 mb-4">Veja e gerencie suas rotinas de treino</p>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold py-2 rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition duration-200">
              Ver Rotinas
            </button>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-cyan-500/30 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Activity size={24} className="text-cyan-400" />
            <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">Atividade Recente</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-cyan-500/20 last:border-0">
                <div>
                  <p className="text-gray-200 font-semibold">Treino Completo</p>
                  <p className="text-sm text-gray-400">Há 2 dias</p>
                </div>
                <span className="text-cyan-400 font-bold">+250 XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
