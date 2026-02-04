/**
 * Layout Root
 * Configuração global da aplicação
 */
import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gym Routine - Monitor Your Workouts',
  description: 'Platform for managing gym routines and tracking your fitness progress',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
