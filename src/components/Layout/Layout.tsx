/**
 * Componente de Layout Principal
 * Wrapper para todas as páginas
 */
'use client';

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto bg-dark p-lg">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
