"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DocsPage() {
  const sections = [
    {
      title: "Hướng dẫn sử dụng",
      description: "Tài liệu hướng dẫn chi tiết về cách sử dụng hệ thống quản lý ký túc xá",
      link: "/admin/docs/user-manual",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Tài liệu API",
      description: "Tài liệu chi tiết về các API endpoints và cách sử dụng",
      link: "/admin/docs/api-docs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Hướng dẫn bảo mật",
      description: "Các biện pháp bảo mật và quy trình xử lý sự cố",
      link: "/admin/docs/security",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Hướng dẫn sao lưu",
      description: "Quy trình sao lưu và khôi phục dữ liệu hệ thống",
      link: "/admin/docs/backup",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">DormSpace Admin</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/admin/dormitories" className="text-gray-700 hover:text-blue-600">Manage Dormitories</Link>
            <Link href="/admin/bookings" className="text-gray-700 hover:text-blue-600">Manage Bookings</Link>
            <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">Manage Users</Link>
            <Link href="/admin/settings" className="text-gray-700 hover:text-blue-600">Settings</Link>
            <Link href="/admin/docs" className="text-blue-600 font-medium">Documentation</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Admin</span>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Tài liệu</h1>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                href={section.link}
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-blue-600">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Liên kết nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/docs/faq"
                className="text-blue-600 hover:text-blue-800"
              >
                Câu hỏi thường gặp
              </Link>
              <Link
                href="/admin/docs/tutorials"
                className="text-blue-600 hover:text-blue-800"
              >
                Video hướng dẫn
              </Link>
              <Link
                href="/admin/docs/changelog"
                className="text-blue-600 hover:text-blue-800"
              >
                Lịch sử cập nhật
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 DormSpace Admin. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/admin/settings" className="text-gray-300 hover:text-white">
                Settings
              </Link>
              <Link href="/admin/docs" className="text-gray-300 hover:text-white">
                Documentation
              </Link>
              <Link href="/admin/logout" className="text-gray-300 hover:text-white">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 