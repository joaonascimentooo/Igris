/**
 * Componente Sidebar
 * Menu lateral de navegação
 */
'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Rotinas', href: '/routines', icon: '📋' },
  { name: 'Treinar', href: '/workout', icon: '🏋️' },
  { name: 'Progresso', href: '/progress', icon: '📈' },
  { name: 'Configurações', href: '/settings', icon: '⚙️' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={clsx(
        'bg-slate-900/60 backdrop-blur-2xl border-r border-cyan-500/30 transition-all duration-300 relative z-20',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <nav className="pt-8 px-4">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400/50 border border-transparent'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="font-semibold">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
