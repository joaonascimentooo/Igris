/**
 * Página de Perfil
 * Design estilo Instagram com sistema de RPG
 */
'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import CharacterCard from '@/components/Character/CharacterCard';
import { useAuth } from '@/hooks';
import { Character } from '@/types';
import { Loader, Heart, MessageCircle, Share2, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'grid' | 'rpg' | 'conquistas'>('rpg');

  useEffect(() => {
    if (user) {
      const mockCharacter: Character = {
        id: user.id,
        userId: user.id,
        name: user.name || 'Guerreiro',
        level: 5,
        experience: 450,
        totalExperience: 450,
        attributes: {
          strength: 75,
          endurance: 68,
          agility: 55,
          wisdom: 62,
          vitality: 70,
        },
        skills: {
          powerlifting: 70,
          cardio: 65,
          flexibility: 45,
          recovery: 60,
          consistency: 80,
        },
        stats: {
          totalWorkouts: 15,
          totalExercises: 120,
          totalWeight: 3500,
          streak: 7,
          achievements: [
            {
              id: '1',
              title: 'Primeiro Treino',
              description: 'Complete seu primeiro treino',
              icon: '🏋️',
              unlockedAt: new Date('2024-01-01'),
              rarity: 'common',
            },
            {
              id: '2',
              title: 'Semana de Fogo',
              description: 'Treinou 7 dias seguidos',
              icon: '🔥',
              unlockedAt: new Date('2024-01-07'),
              rarity: 'rare',
            },
            {
              id: '3',
              title: 'Gigante',
              description: 'Levantou 500kg totais',
              icon: '💪',
              unlockedAt: new Date('2024-01-15'),
              rarity: 'epic',
            },
          ],
          nextLevelExp: 1000,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCharacter(mockCharacter);
      setLoading(false);
    }
  }, [user]);

  const mockWorkouts = [
    { id: '1', name: 'Peito', date: '2024-01-15', duration: '45min' },
    { id: '2', name: 'Costas', date: '2024-01-14', duration: '50min' },
    { id: '3', name: 'Pernas', date: '2024-01-13', duration: '60min' },
    { id: '4', name: 'Ombros', date: '2024-01-12', duration: '40min' },
    { id: '5', name: 'Braços', date: '2024-01-11', duration: '35min' },
    { id: '6', name: 'Cardio', date: '2024-01-10', duration: '30min' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <Loader className="animate-spin text-cyan-400" size={48} />
        </div>
      </Layout>
    );
  }

  if (!character || !user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-400">Perfil não encontrado</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header do Perfil */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl mb-6">
          {/* Foto e Info */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Infos */}
              <div className="flex-1">
                <h1 className="text-3xl font-black text-white">{user.name}</h1>
                <p className="text-cyan-400 text-sm font-semibold mt-1">@{user.name?.toLowerCase().replace(' ', '')}</p>
                <p className="text-gray-300 mt-3">Nível {character.level} ⚔️</p>
              </div>
            </div>

            <button className="text-cyan-400 hover:text-cyan-300 transition">
              <Settings size={24} />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 py-6 border-y border-cyan-500/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{character.stats.totalWorkouts}</p>
              <p className="text-gray-400 text-xs mt-1">Treinos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{character.level}</p>
              <p className="text-gray-400 text-xs mt-1">Nível</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{character.stats.streak}</p>
              <p className="text-gray-400 text-xs mt-1">Sequência</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{character.stats.achievements.length}</p>
              <p className="text-gray-400 text-xs mt-1">Conquistas</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              💪 Guerreiro em jornada de transformação <br />
              🔥 {character.stats.streak} dias de sequência <br />
              ⚔️ Nível {character.level} no RPG do treino
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-6 border-b border-cyan-500/20 px-2">
          <button
            onClick={() => setActiveTab('grid')}
            className={`py-3 font-semibold transition ${
              activeTab === 'grid'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Treinos
          </button>
          <button
            onClick={() => setActiveTab('rpg')}
            className={`py-3 font-semibold transition ${
              activeTab === 'rpg'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Personagem
          </button>
          <button
            onClick={() => setActiveTab('conquistas')}
            className={`py-3 font-semibold transition ${
              activeTab === 'conquistas'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Conquistas
          </button>
        </div>

        {/* Grid de Treinos */}
        {activeTab === 'grid' && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {mockWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 aspect-square"
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 hover:scale-105 transition">
                  <p className="text-3xl mb-2">
                    {workout.name === 'Peito'
                      ? '🏋️'
                      : workout.name === 'Costas'
                      ? '💪'
                      : workout.name === 'Pernas'
                      ? '🦵'
                      : workout.name === 'Ombros'
                      ? '🤸'
                      : workout.name === 'Braços'
                      ? '💯'
                      : '🏃'}
                  </p>
                  <p className="text-white font-bold">{workout.name}</p>
                  <p className="text-white text-xs mt-2">{workout.duration}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <Heart size={20} className="text-white mb-1" />
                    <p className="text-white text-xs">145</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle size={20} className="text-white mb-1" />
                    <p className="text-white text-xs">23</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Share2 size={20} className="text-white mb-1" />
                    <p className="text-white text-xs">12</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Personagem RPG */}
        {activeTab === 'rpg' && (
          <div className="mb-8">
            <CharacterCard character={character} />
          </div>
        )}

        {/* Conquistas */}
        {activeTab === 'conquistas' && (
          <div className="mb-8 grid grid-cols-2 gap-4">
            {character.stats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-2xl p-6 border-2 ${
                  achievement.rarity === 'legendary'
                    ? 'bg-yellow-500/10 border-yellow-400/50'
                    : achievement.rarity === 'epic'
                    ? 'bg-purple-500/10 border-purple-400/50'
                    : achievement.rarity === 'rare'
                    ? 'bg-blue-500/10 border-blue-400/50'
                    : 'bg-gray-500/10 border-gray-400/50'
                }`}
              >
                <div className="text-center">
                  <p className="text-5xl mb-3">{achievement.icon}</p>
                  <h4 className="font-bold text-white">{achievement.title}</h4>
                  <p className="text-gray-400 text-xs mt-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;

