import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-800">
              DormSpace Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">
                Users
              </Link>
              <Link href="/admin/dormitories" className="text-gray-600 hover:text-gray-900">
                Dormitories
              </Link>
              <Link href="/admin/bookings" className="text-gray-600 hover:text-gray-900">
                Bookings
              </Link>
              <Link href="/admin/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 DormSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 