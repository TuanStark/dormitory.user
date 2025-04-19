"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HelpPage() {
  const faqs = [
    {
      question: "Làm thế nào để thêm một ký túc xá mới?",
      answer: "Để thêm ký túc xá mới, hãy vào trang Quản lý ký túc xá, nhấn nút 'Thêm mới' và điền đầy đủ thông tin về ký túc xá. Sau khi hoàn tất, nhấn 'Lưu' để tạo ký túc xá mới."
    },
    {
      question: "Làm thế nào để quản lý đặt phòng?",
      answer: "Bạn có thể xem và quản lý tất cả đặt phòng trong trang Quản lý đặt phòng. Tại đây bạn có thể xem chi tiết, xác nhận, hủy hoặc cập nhật trạng thái đặt phòng."
    },
    {
      question: "Làm thế nào để quản lý người dùng?",
      answer: "Trang Quản lý người dùng cho phép bạn xem danh sách người dùng, thêm người dùng mới, chỉnh sửa thông tin hoặc vô hiệu hóa tài khoản người dùng."
    },
    {
      question: "Làm thế nào để thay đổi cài đặt hệ thống?",
      answer: "Vào trang Cài đặt để thay đổi các thông tin chung, thông tin liên hệ, cài đặt hệ thống và cài đặt thông báo. Nhớ nhấn 'Lưu cài đặt' sau khi thay đổi."
    }
  ];

  const contactInfo = {
    email: "support@dormspace.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, Đà Nẵng",
    workingHours: "8:00 - 17:00"
  };

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
            <Link href="/admin/help" className="text-blue-600 font-medium">Help</Link>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Trợ giúp</h1>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Hỗ trợ kỹ thuật</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {contactInfo.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Điện thoại:</span> {contactInfo.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Địa chỉ:</span> {contactInfo.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Giờ làm việc:</span> {contactInfo.workingHours}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Tài liệu hướng dẫn</h3>
                <div className="space-y-2">
                  <Link href="/admin/docs/user-manual" className="block text-blue-600 hover:text-blue-800">
                    Hướng dẫn sử dụng
                  </Link>
                  <Link href="/admin/docs/api-docs" className="block text-blue-600 hover:text-blue-800">
                    Tài liệu API
                  </Link>
                  <Link href="/admin/docs/security" className="block text-blue-600 hover:text-blue-800">
                    Hướng dẫn bảo mật
                  </Link>
                  <Link href="/admin/docs/backup" className="block text-blue-600 hover:text-blue-800">
                    Hướng dẫn sao lưu
                  </Link>
                </div>
              </div>
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
              <Link href="/admin/help" className="text-gray-300 hover:text-white">
                Help
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