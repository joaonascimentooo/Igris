
'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/hooks';
import { Plus, X, CheckCircle } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
}

interface DayColumn {
  day: string;
  dayName: string;
  exercises: Exercise[];
  completed: boolean;
  xpGained: number;
}

const WorkoutPage: React.FC = () => {
  const { user } = useAuth();
  const [weekWorkouts, setWeekWorkouts] = useState<DayColumn[]>([
    { day: 'seg', dayName: 'Segunda', exercises: [], completed: false, xpGained: 0 },
    { day: 'ter', dayName: 'Terça', exercises: [], completed: false, xpGained: 0 },
    { day: 'qua', dayName: 'Quarta', exercises: [], completed: false, xpGained: 0 },
    { day: 'qui', dayName: 'Quinta', exercises: [], completed: false, xpGained: 0 },
    { day: 'sex', dayName: 'Sexta', exercises: [], completed: false, xpGained: 0 },
    { day: 'sab', dayName: 'Sábado', exercises: [], completed: false, xpGained: 0 },
    { day: 'dom', dayName: 'Domingo', exercises: [], completed: false, xpGained: 0 },
  ]);

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);

  const addExerciseToDay = (day: string) => {
    const exerciseName = inputValues[day]?.trim();
    if (!exerciseName) return;

    setWeekWorkouts(
      weekWorkouts.map((col) =>
        col.day === day
          ? {
              ...col,
              exercises: [
                ...col.exercises,
                { id: Math.random().toString(36).substr(2, 9), name: exerciseName },
              ],
            }
          : col
      )
    );

    setInputValues({ ...inputValues, [day]: '' });
  };

  const removeExercise = (day: string, exerciseId: string) => {
    setWeekWorkouts(
      weekWorkouts.map((col) =>
        col.day === day
          ? {
              ...col,
              exercises: col.exercises.filter((e) => e.id !== exerciseId),
            }
          : col
      )
    );
  };

  const completeWorkout = (day: string) => {
    const column = weekWorkouts.find((w) => w.day === day);
    if (!column || column.exercises.length === 0) return;

    const xpGained = column.exercises.length * 10;

    setWeekWorkouts(
      weekWorkouts.map((w) =>
        w.day === day
          ? { ...w, completed: true, xpGained }
          : w
      )
    );
  };

  const resetDay = (day: string) => {
    setWeekWorkouts(
      weekWorkouts.map((w) =>
        w.day === day
          ? { ...w, exercises: [], completed: false, xpGained: 0 }
          : w
      )
    );
  };

  const totalXp = weekWorkouts.reduce((sum, w) => sum + w.xpGained, 0);
  const completedDays = weekWorkouts.filter((w) => w.completed).length;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsScrolling(true);
    setScrollStart(e.clientX - scrollContainerRef.current.offsetLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrolling || !scrollContainerRef.current) return;
    e.preventDefault();
    const currentX = e.clientX - scrollContainerRef.current.offsetLeft;
    const walk = (currentX - scrollStart) * 1.5;
    scrollContainerRef.current.scrollLeft -= walk;
    setScrollStart(currentX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  if (!user) {
    return (
      <Layout>
        <p className="text-gray-400">Carregando...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-full overflow-hidden h-full">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text mb-1">
            Seu Treino da Semana
          </h1>
          <p className="text-gray-400 mb-2 text-xs">Organize seus treinos por dia em colunas Kanban</p>

          {/* Stats */}
          <div className="flex gap-1.5 mb-2 flex-wrap">
            <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/30 rounded px-2 py-1">
              <div className="text-xs text-gray-400">Dias: {completedDays}/7</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30 rounded px-2 py-1">
              <div className="text-xs text-yellow-300">XP: {totalXp}</div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
            <span>Seus treinos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 auto-rows-max">
            {weekWorkouts.map((column) => (
              <div
                key={column.day}
                className={`rounded-2xl backdrop-blur-2xl border-2 p-4 transition-all text-xs overflow-hidden group ${
                  column.completed
                    ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/40 shadow-lg shadow-green-500/10'
                    : 'bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10'
                }`}
              >
                {/* Header da Coluna */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/20">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                      {column.dayName}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {column.exercises.length} exercício{column.exercises.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {column.completed && (
                    <div className="text-center flex-shrink-0 px-2 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
                      <CheckCircle className="text-green-400 mx-auto" size={16} />
                      <p className="text-green-400 font-bold text-xs mt-1">+{column.xpGained} XP</p>
                    </div>
                  )}
                </div>

                {/* Cards de Exercícios */}
                <div className="space-y-1.5 mb-3 min-h-24 max-h-40 overflow-y-auto pr-1">
                  {column.exercises.length > 0 ? (
                    column.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="bg-gradient-to-r from-purple-600/30 to-purple-500/20 border border-purple-500/40 rounded-lg p-2 hover:border-purple-500/70 hover:from-purple-600/40 hover:to-purple-500/30 transition-all group/item"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-gray-100 font-semibold flex-1 break-words text-xs line-clamp-2">
                            {exercise.name}
                          </span>
                          {!column.completed && (
                            <button
                              onClick={() => removeExercise(column.day, exercise.id)}
                              className="text-red-400 hover:text-red-300 transition opacity-0 group-hover/item:opacity-100 flex-shrink-0 hover:scale-110"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 flex items-center justify-center h-full">
                      <p className="text-gray-500 text-xs">Nenhum exercício adicionado</p>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="space-y-2 border-t border-cyan-500/20 pt-2">
                  {!column.completed ? (
                    <>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="Nome do exercício..."
                          value={inputValues[column.day] || ''}
                          onChange={(e) =>
                            setInputValues({ ...inputValues, [column.day]: e.target.value })
                          }
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') addExerciseToDay(column.day);
                          }}
                          className="flex-1 bg-slate-700/60 text-white text-xs px-2.5 py-2 rounded-lg border border-cyan-500/20 focus:border-cyan-500/60 focus:outline-none transition focus:bg-slate-700"
                        />
                        <button
                          onClick={() => addExerciseToDay(column.day)}
                          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-2.5 py-2 rounded-lg transition font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => completeWorkout(column.day)}
                        disabled={column.exercises.length === 0}
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white py-2 rounded-lg transition font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                      >
                        <CheckCircle size={16} />
                        Completar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => resetDay(column.day)}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-gray-200 py-2 rounded-lg transition text-xs font-semibold"
                    >
                      Resetar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </Layout>
  );
};

export default WorkoutPage;
