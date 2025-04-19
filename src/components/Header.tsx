'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">DormSpace</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/dormitories" className="text-gray-700 hover:text-blue-600">Danh sách KTX</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">Giới thiệu</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Liên hệ</Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600">Bài viết</Link>
          </nav>
          {isLogin ? (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-600">Đăng nhập</Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Đăng ký</Link>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center space-x-4">
                <img src="/next.svg" alt="avatar" className='w-15 h-15 rounded-full bg-gray-200 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                <div className='flex flex-col'>
                  <span className='text-gray-700'>{user.name}</span>
                  <span className='text-gray-500 text-sm'>{user.email}</span>
                </div>
              </div>
              {isOpen && (
                <div className='absolute top-15 right-45 w-50 bg-gray-100 shadow-md rounded-lg z-10'>
                  <div className='p-4 flex flex-col'>
                    <div className='flex items-center space-x-2'>
                      <img src="/next.svg" alt="avatar" className='w-15 h-15 rounded-full bg-gray-200 cursor-pointer' />
                      <Link href="/profile" className='text-gray-700 hover:text-blue-600'>Trang cá nhân</Link>
                    </div>
                    <div>
                    <Link href="/profile" className='text-gray-700 hover:text-blue-600'>Trang cá nhân</Link>
                    </div>
                    <div>
                    <Link href="/profile" className='text-gray-700 hover:text-blue-600'>Trang cá nhân</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}