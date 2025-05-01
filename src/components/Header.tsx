'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Kiểm tra trạng thái đăng nhập trực tiếp từ session
  const isLoggedIn = !!session;
  console.log("isLoggedIn", isLoggedIn);

  // Thông tin người dùng
  const userName = session?.user?.name || 'Người dùng';
  const userEmail = session?.user?.email || '';

  // Xử lý đăng xuất
  const handleSignOut = async () => {
    try {
      console.log('Client: Initiating sign out');
      // Xóa token trong localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('rememberMe');
      console.log('Client: Tokens removed from localStorage');

      // Đăng xuất NextAuth
      await signOut({ callbackUrl: '/login' });
      toast.success('Đăng xuất thành công!', {
        position: 'top-right',
      });
    } catch (error) {
      console.error('Client: Error during sign out:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.', {
        position: 'top-right',
      });
    }
  };

  // Animation variants cho dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DormSpace
        </Link>

        {/* Nút hamburger cho mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu điều hướng */}
        <nav
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10`}
        >
          <Link
            href="/dormitories"
            className="block md:inline-block text-gray-700 hover:text-blue-600 mb-2 md:mb-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Danh sách KTX
          </Link>
          <Link
            href="/about"
            className="block md:inline-block text-gray-700 hover:text-blue-600 mb-2 md:mb-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Giới thiệu
          </Link>
          <Link
            href="/contact"
            className="block md:inline-block text-gray-700 hover:text-blue-600 mb-2 md:mb-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Liên hệ
          </Link>
          <Link
            href="/news"
            className="block md:inline-block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bài viết
          </Link>
        </nav>

        {/* Phần đăng nhập/đăng xuất */}
        {isLoggedIn ? (
          <div className="relative">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={session?.user?.image || '/default-avatar.png'}
                alt="Avatar"
                className="w-10 h-10 rounded-full bg-gray-200 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-gray-700 font-medium">{userName}</span>
                <span className="text-gray-500 text-sm truncate max-w-[150px]">
                  {userEmail}
                </span>
              </div>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg z-20 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-4 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={session?.user?.image || '/default-avatar.png'}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full bg-gray-200 object-cover"
                      />
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Trang cá nhân
                      </Link>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 hover:text-blue-600 text-left"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}