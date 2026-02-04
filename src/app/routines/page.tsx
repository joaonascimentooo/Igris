/**
 * Exemplo de página de Rotinas
 * Demonstra padrão de uso de hooks + components
 */
'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth, useRoutines } from '@/hooks';
import { Card, Button, Input, Modal } from '@/components/Common';
import { Routine } from '@/types';

const RoutinesPage: React.FC = () => {
  const { user } = useAuth();
  const { routines, isLoading, createRoutine } = useRoutines(user?.id || null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleCreateRoutine = async () => {
    if (!formData.name) return;

    try {
      await createRoutine({
        name: formData.name,
        description: formData.description,
        exercises: [],
        isActive: true,
        userId: user?.id || '',
      } as any);

      setFormData({ name: '', description: '' });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating routine:', err);
    }
  };

  return (
    <Layout>
      <div className="space-y-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Minhas Rotinas 📋</h1>
          <Button onClick={() => setIsModalOpen(true)}>+ Nova Rotina</Button>
        </div>

        {isLoading ? (
          <div className="text-center py-lg">
            <p className="text-light">Carregando rotinas...</p>
          </div>
        ) : routines.length === 0 ? (
          <Card className="text-center py-lg">
            <p className="text-light mb-md">Nenhuma rotina criada ainda</p>
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              Criar Primeira Rotina
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {routines.map((routine: Routine) => (
              <Card key={routine.id}>
                <div className="flex justify-between items-start mb-md">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{routine.name}</h3>
                    <p className="text-sm text-light opacity-75 mt-xs">{routine.exercises?.length || 0} exercícios</p>
                  </div>
                  {routine.isActive && <span className="text-green-500">●</span>}
                </div>
                <p className="text-light mb-md opacity-90">{routine.description}</p>
                <div className="flex gap-md">
                  <Button size="sm" variant="secondary">Editar</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Nova Rotina"
        onClose={() => setIsModalOpen(false)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRoutine}>Criar</Button>
          </>
        }
      >
        <div className="space-y-md">
          <Input
            label="Nome da Rotina"
            placeholder="Ex: Upper Power"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Descrição"
            placeholder="Ex: Treino de força para membros superiores"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export default RoutinesPage;
