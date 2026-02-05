/**
 * Hook useCharacter
 * Gerencia o personagem RPG do usuário
 */
'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/types';
import { useAuth } from './useAuth';

export const useCharacter = () => {
  const { user } = useAuth();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadCharacter = async () => {
      try {
        setLoading(true);
        // TODO: Buscar personagem do Firestore
        // Para agora, criar um personagem padrão
        const mockCharacter: Character = {
          id: user.id,
          userId: user.id,
          name: user.name || 'Guerreiro',
          level: 1,
          experience: 0,
          totalExperience: 0,
          attributes: {
            strength: 10,
            endurance: 10,
            agility: 10,
            wisdom: 10,
            vitality: 10,
          },
          skills: {
            powerlifting: 0,
            cardio: 0,
            flexibility: 0,
            recovery: 0,
            consistency: 0,
          },
          stats: {
            totalWorkouts: 0,
            totalExercises: 0,
            totalWeight: 0,
            streak: 0,
            achievements: [],
            nextLevelExp: 1000,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCharacter(mockCharacter);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar personagem');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [user]);

  /**
   * Adiciona experiência ao personagem
   */
  const addExperience = (amount: number) => {
    if (!character) return;

    const newExp = character.experience + amount;
    let newLevel = character.level;
    let levelUpExp = amount;

    // Verificar se subiu de nível
    if (newExp >= character.stats.nextLevelExp) {
      newLevel += Math.floor(newExp / character.stats.nextLevelExp);
      levelUpExp = newExp % character.stats.nextLevelExp;
    }

    const updatedCharacter: Character = {
      ...character,
      experience: newExp % character.stats.nextLevelExp,
      totalExperience: character.totalExperience + amount,
      level: newLevel,
    };

    setCharacter(updatedCharacter);
    // TODO: Salvar no Firestore
  };

  /**
   * Atualiza atributos baseado em exercícios
   */
  const updateAttributesFromExercise = (
    exerciseType: 'strength' | 'cardio' | 'flexibility',
    intensity: number
  ) => {
    if (!character) return;

    const updatedCharacter = { ...character };

    switch (exerciseType) {
      case 'strength':
        updatedCharacter.attributes.strength += intensity;
        updatedCharacter.skills.powerlifting += intensity * 0.5;
        break;
      case 'cardio':
        updatedCharacter.attributes.endurance += intensity;
        updatedCharacter.skills.cardio += intensity * 0.5;
        break;
      case 'flexibility':
        updatedCharacter.attributes.agility += intensity;
        updatedCharacter.skills.flexibility += intensity * 0.5;
        break;
    }

    // Limitar atributos a 100
    Object.keys(updatedCharacter.attributes).forEach((key) => {
      const attr = key as keyof typeof updatedCharacter.attributes;
      if (updatedCharacter.attributes[attr] > 100) {
        updatedCharacter.attributes[attr] = 100;
      }
    });

    setCharacter(updatedCharacter);
    // TODO: Salvar no Firestore
  };

  /**
   * Adiciona conquista
   */
  const unlockAchievement = (achievement: any) => {
    if (!character) return;

    const updatedCharacter = {
      ...character,
      stats: {
        ...character.stats,
        achievements: [...character.stats.achievements, achievement],
      },
    };

    setCharacter(updatedCharacter);
    // TODO: Salvar no Firestore
  };

  return {
    character,
    loading,
    error,
    addExperience,
    updateAttributesFromExercise,
    unlockAchievement,
  };
};
