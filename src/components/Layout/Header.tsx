/**
 * Componente Header
 * Navbar principal da aplicação
 */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-cyan-500/30 px-8 py-4 flex items-center justify-between relative z-50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-2xl"
        >
          ☰
        </button>
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text inline-block">
          IGRIS
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {user && (
          <>
            <span className="text-gray-300 font-semibold">{user.name}</span>
            <button
              onClick={() => router.push('/profile')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition duration-200 hover:scale-105 active:scale-95"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition duration-200 hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
