/**
 * Página Dashboard
 * Home principal após login
 */
'use client';

import React from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/hooks';
import { Card } from '@/components/Common';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Treinos Esta Semana', value: '3', icon: '💪' },
    { label: 'Horas Treinadas', value: '4.5h', icon: '⏱️' },
    { label: 'Calorias Queimadas', value: '2,450', icon: '🔥' },
    { label: 'Sequência', value: '7 dias', icon: '🔗' },
  ];

  return (
    <Layout>
      <div className="space-y-lg">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-md">
            Bem-vindo, {user?.name}! 👋
          </h1>
          <p className="text-light text-lg">Vamos treinar hoje?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-light text-sm opacity-75">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary mt-xs">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <Card className="hover:border-primary cursor-pointer">
            <h3 className="text-xl font-bold text-primary mb-md">🏋️ Iniciar Treino</h3>
            <p className="text-light mb-md">Comece um treino com sua rotina atual</p>
            <button className="bg-primary text-dark px-lg py-sm rounded font-semibold hover:bg-orange-500 transition-colors">
              Treinar Agora
            </button>
          </Card>

          <Card className="hover:border-primary cursor-pointer">
            <h3 className="text-xl font-bold text-primary mb-md">📋 Minhas Rotinas</h3>
            <p className="text-light mb-md">Veja e gerencie suas rotinas de treino</p>
            <button className="bg-primary text-dark px-lg py-sm rounded font-semibold hover:bg-orange-500 transition-colors">
              Ver Rotinas
            </button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <h3 className="text-xl font-bold text-primary mb-md">📊 Atividade Recente</h3>
          <div className="space-y-md">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between pb-md border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-light font-semibold">Treino Completo</p>
                  <p className="text-sm text-light opacity-50">Há 2 dias</p>
                </div>
                <span className="text-primary font-bold">+250 XP</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
