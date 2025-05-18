'use client';

import React from 'react';
import { usePathname } from 'next/navigation';



export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          {children}
    </div>
  );
} 