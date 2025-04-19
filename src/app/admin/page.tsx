import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stats Cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
        <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Dormitories</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">56</p>
        <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Bookings</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">789</p>
        <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
        <p className="text-3xl font-bold text-orange-600 mt-2">$45,678</p>
        <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
      </div>

      {/* Recent Activity */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="ml-3 text-gray-600">New booking created</p>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="ml-3 text-gray-600">New user registered</p>
            </div>
            <span className="text-sm text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="ml-3 text-gray-600">New dormitory added</p>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="ml-3 text-gray-600">Payment received</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/users/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700">
            Add New User
          </Link>
          <Link href="/admin/dormitories/new" className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700">
            Add New Dormitory
          </Link>
          <Link href="/admin/bookings/new" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700">
            Create Booking
          </Link>
          <Link href="/admin/reports" className="bg-orange-600 text-white px-4 py-2 rounded-lg text-center hover:bg-orange-700">
            Generate Report
          </Link>
        </div>
      </div>
    </div>
  );
} 