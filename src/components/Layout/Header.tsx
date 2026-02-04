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
    <header className="bg-secondary border-b border-gray-700 px-lg py-md flex items-center justify-between">
      <div className="flex items-center gap-md">
        <button
          onClick={onToggleSidebar}
          className="text-light hover:text-primary transition-colors"
        >
          ☰
        </button>
        <h1 className="text-2xl font-bold text-primary">💪 Gym Routine</h1>
      </div>

      <div className="flex items-center gap-md">
        {user && (
          <>
            <span className="text-light">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-md py-xs bg-primary text-dark rounded hover:bg-orange-500 transition-colors"
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
