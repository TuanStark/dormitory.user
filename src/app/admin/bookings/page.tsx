"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    dormitoryName: "Ký túc xá Đại học Bách khoa",
    roomType: "Phòng 4 người (Standard)",
    studentName: "Nguyễn Văn A",
    studentEmail: "nguyenvana@example.com",
    studentPhone: "0123456789",
    checkInDate: "2024-03-01",
    checkOutDate: "2024-08-31",
    monthlyFee: 1500000,
    deposit: 3000000,
    status: "pending",
    paymentMethod: "momo",
    createdAt: "2024-02-15",
  },
  {
    id: 2,
    dormitoryName: "Ký túc xá Đại học Kinh tế",
    roomType: "Phòng 2 người (Deluxe)",
    studentName: "Trần Thị B",
    studentEmail: "tranthib@example.com",
    studentPhone: "0987654321",
    checkInDate: "2024-03-15",
    checkOutDate: "2024-08-15",
    monthlyFee: 2500000,
    deposit: 5000000,
    status: "confirmed",
    paymentMethod: "bank_transfer",
    createdAt: "2024-02-20",
  },
  // Add more mock bookings as needed
];

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    paymentMethod: "all",
  });

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter bookings based on current filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         booking.dormitoryName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === "all" || booking.status === filters.status;
    const matchesPaymentMethod = filters.paymentMethod === "all" || booking.paymentMethod === filters.paymentMethod;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  // Handle status change
  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">DormSpace Admin</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/admin/dormitories" className="text-gray-700 hover:text-blue-600">Manage Dormitories</Link>
            <Link href="/admin/bookings" className="text-blue-600 font-medium">Manage Bookings</Link>
            <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">Manage Users</Link>
            <Link href="/admin/settings" className="text-gray-700 hover:text-blue-600">Settings</Link>
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý đặt phòng</h1>
          <div className="flex space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Xuất báo cáo
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Tạo đặt phòng mới
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm
              </label>
              <input
                type="text"
                id="search"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Tên sinh viên hoặc ký túc xá..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Đã hủy</option>
                <option value="completed">Đã hoàn thành</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Phương thức thanh toán
              </label>
              <select
                id="paymentMethod"
                value={filters.paymentMethod}
                onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="momo">Momo</option>
                <option value="bank_transfer">Chuyển khoản</option>
                <option value="vnpay">VNPay</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đặt phòng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ký túc xá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sinh viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày check-out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá phòng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.dormitoryName}
                      <div className="text-xs text-gray-500">{booking.roomType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.studentName}
                      <div className="text-xs text-gray-500">{booking.studentEmail}</div>
                      <div className="text-xs text-gray-500">{booking.studentPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(booking.checkInDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(booking.checkOutDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(booking.monthlyFee)}/tháng
                      <div className="text-xs text-gray-500">
                        Đặt cọc: {formatCurrency(booking.deposit)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`text-sm rounded-full px-3 py-1 font-semibold ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="completed">Đã hoàn thành</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          Chi tiết
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Hủy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Hiển thị 1-10 của {filteredBookings.length} đặt phòng
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Trước
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Sau
            </button>
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