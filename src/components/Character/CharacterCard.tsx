/**
 * Componente Character Card
 * Exibe o personagem do usuário no RPG
 */
'use client';

import React from 'react';
import { Character, CharacterAttributes } from '@/types';
import { Award, Zap, Heart, Shield } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const expPercent = (character.experience / character.stats.nextLevelExp) * 100;

  const getAttributeColor = (value: number) => {
    if (value >= 80) return 'from-yellow-400 to-orange-400';
    if (value >= 60) return 'from-green-400 to-cyan-400';
    if (value >= 40) return 'from-blue-400 to-cyan-400';
    return 'from-gray-400 to-gray-300';
  };

  const AttributeBar: React.FC<{
    label: string;
    value: number;
    icon: React.ReactNode;
  }> = ({ label, value, icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-cyan-400">{icon}</div>
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-bold text-cyan-400">{value}</span>
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${getAttributeColor(value)} transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text">
            {character.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Nível {character.level}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-cyan-400">⚔️</div>
          <p className="text-gray-400 text-xs mt-2">Guerreiro do Treino</p>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="space-y-3 mb-8 pb-8 border-b border-cyan-500/20">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300">Experiência</span>
          <span className="text-sm text-cyan-400">
            {character.experience} / {character.stats.nextLevelExp} XP
          </span>
        </div>
        <div className="w-full bg-slate-800/50 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-300"
            style={{ width: `${expPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Attributes */}
      <div className="space-y-6 mb-8 pb-8 border-b border-cyan-500/20">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap size={20} className="text-cyan-400" />
          Atributos
        </h3>
        <div className="space-y-4">
          <AttributeBar
            label="Força"
            value={character.attributes.strength}
            icon={<Shield size={16} />}
          />
          <AttributeBar
            label="Resistência"
            value={character.attributes.endurance}
            icon={<Heart size={16} />}
          />
          <AttributeBar
            label="Agilidade"
            value={character.attributes.agility}
            icon={<Zap size={16} />}
          />
          <AttributeBar
            label="Sabedoria"
            value={character.attributes.wisdom}
            icon={<Award size={16} />}
          />
          <AttributeBar
            label="Vitalidade"
            value={character.attributes.vitality}
            icon={<Heart size={16} />}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-cyan-500/20">
          <p className="text-gray-400 text-xs">Treinos</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">{character.stats.totalWorkouts}</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-cyan-500/20">
          <p className="text-gray-400 text-xs">Exercícios</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">{character.stats.totalExercises}</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-cyan-500/20">
          <p className="text-gray-400 text-xs">Total Levantado</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">{character.stats.totalWeight}kg</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-cyan-500/20">
          <p className="text-gray-400 text-xs">Sequência</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">{character.stats.streak}🔥</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
