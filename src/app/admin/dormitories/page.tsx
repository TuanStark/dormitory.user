"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DormitoriesManagementPage() {
  // Mock data for dormitories
  const [dormitories, setDormitories] = useState([
    { 
      id: 'D001', 
      name: 'Green Valley Dormitory', 
      location: 'Quận Hải Châu', 
      rooms: 24, 
      occupancy: '85%', 
      status: 'Active',
      priceRange: '1.5 - 2.5 triệu',
      rating: 4.5,
      reviews: 120,
      image: '/images/dormitory-1.jpg'
    },
    { 
      id: 'D002', 
      name: 'Sunshine Dormitory', 
      location: 'Quận Thanh Khê', 
      rooms: 18, 
      occupancy: '92%', 
      status: 'Active',
      priceRange: '1.8 - 3 triệu',
      rating: 4.7,
      reviews: 85,
      image: '/images/dormitory-2.jpg'
    },
    { 
      id: 'D003', 
      name: 'Mountain View Dormitory', 
      location: 'Quận Liên Chiểu', 
      rooms: 30, 
      occupancy: '78%', 
      status: 'Active',
      priceRange: '1.2 - 2 triệu',
      rating: 4.2,
      reviews: 95,
      image: '/images/dormitory-3.jpg'
    },
    { 
      id: 'D004', 
      name: 'Ocean Breeze Dormitory', 
      location: 'Quận Sơn Trà', 
      rooms: 20, 
      occupancy: '65%', 
      status: 'Maintenance',
      priceRange: '2 - 3.5 triệu',
      rating: 4.8,
      reviews: 110,
      image: '/images/dormitory-4.jpg'
    },
    { 
      id: 'D005', 
      name: 'City Center Dormitory', 
      location: 'Quận Hải Châu', 
      rooms: 15, 
      occupancy: '100%', 
      status: 'Active',
      priceRange: '2.5 - 4 triệu',
      rating: 4.6,
      reviews: 75,
      image: '/images/dormitory-5.jpg'
    },
    { 
      id: 'D006', 
      name: 'University Heights', 
      location: 'Quận Thanh Khê', 
      rooms: 25, 
      occupancy: '88%', 
      status: 'Active',
      priceRange: '1.5 - 2.8 triệu',
      rating: 4.4,
      reviews: 130,
      image: '/images/dormitory-6.jpg'
    },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Filter dormitories based on search and filters
  const filteredDormitories = dormitories.filter(dormitory => {
    const matchesSearch = dormitory.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dormitory.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dormitory.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || dormitory.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setDormitories(dormitories.map(dormitory => 
      dormitory.id === id ? { ...dormitory, status: newStatus } : dormitory
    ));
  };

  // Handle delete dormitory
  const handleDeleteDormitory = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ký túc xá này?')) {
      setDormitories(dormitories.filter(dormitory => dormitory.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">DormSpace Admin</Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/admin/dormitories" className="text-blue-600 font-medium">Manage Dormitories</Link>
            <Link href="/admin/bookings" className="text-gray-700 hover:text-blue-600">Manage Bookings</Link>
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
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Ký túc xá</h1>
          <Link href="/admin/dormitories/add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Thêm Ký túc xá mới
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
              <input
                type="text"
                id="search"
                placeholder="Tìm theo tên hoặc địa điểm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                id="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Active">Đang hoạt động</option>
                <option value="Maintenance">Bảo trì</option>
                <option value="Inactive">Không hoạt động</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
              <select
                id="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="Quận Hải Châu">Quận Hải Châu</option>
                <option value="Quận Thanh Khê">Quận Thanh Khê</option>
                <option value="Quận Liên Chiểu">Quận Liên Chiểu</option>
                <option value="Quận Sơn Trà">Quận Sơn Trà</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dormitories Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa điểm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số phòng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ đầy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đánh giá</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDormitories.map((dormitory) => (
                  <tr key={dormitory.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dormitory.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 relative rounded-md overflow-hidden">
                        <Image 
                          src={dormitory.image} 
                          alt={dormitory.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dormitory.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dormitory.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dormitory.rooms}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dormitory.occupancy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dormitory.priceRange}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{dormitory.rating}</span>
                        <span className="text-gray-400 ml-1">({dormitory.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          dormitory.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          dormitory.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}
                        value={dormitory.status}
                        onChange={(e) => handleStatusChange(dormitory.id, e.target.value)}
                      >
                        <option value="Active">Đang hoạt động</option>
                        <option value="Maintenance">Bảo trì</option>
                        <option value="Inactive">Không hoạt động</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link href={`/admin/dormitories/${dormitory.id}`} className="text-blue-600 hover:text-blue-900">
                          Chi tiết
                        </Link>
                        <Link href={`/admin/dormitories/${dormitory.id}/edit`} className="text-green-600 hover:text-green-900">
                          Sửa
                        </Link>
                        <button 
                          onClick={() => handleDeleteDormitory(dormitory.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Xóa
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
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{filteredDormitories.length}</span> ký túc xá
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
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