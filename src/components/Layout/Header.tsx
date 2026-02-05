/**
 * Componente Header
 * Navbar principal da aplicação
 */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { User, LogOut } from 'lucide-react';

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

      <div className="flex items-center gap-4">
        {user && (
          <>
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/30 hover:border-purple-400/60 hover:from-purple-600/40 hover:to-purple-500/20 text-gray-200 hover:text-cyan-300 font-semibold transition-all duration-200 cursor-pointer group"
              title="Ir para perfil"
            >
              <User size={18} className="text-purple-400 group-hover:text-cyan-400 transition-colors" />
              <span className="group-hover:translate-x-0.5 transition-transform">{user.name}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/30 hover:border-purple-400/60 hover:from-purple-600/40 hover:to-purple-500/20 text-gray-200 hover:text-cyan-300 font-semibold transition-all duration-200 cursor-pointer group"
              title="Sair da aplicação"
            >
              <LogOut size={18} className="text-purple-400 group-hover:text-cyan-400 transition-colors" />
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
