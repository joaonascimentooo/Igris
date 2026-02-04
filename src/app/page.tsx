/**
 * Página Index
 * Redireciona para dashboard ou login
 */
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar após montar no client
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-light">Carregando...</p>
    </div>
  );
};

export default HomePage;
