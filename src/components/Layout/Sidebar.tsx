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
        'bg-secondary border-r border-gray-700 transition-all duration-300',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <nav className="pt-lg px-md">
        <ul className="space-y-md">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center gap-md px-md py-sm rounded transition-colors',
                  'text-light hover:bg-primary hover:text-dark'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
