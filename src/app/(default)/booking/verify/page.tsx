'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    university: '',
    checkInDate: '',
    duration: '6'
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    university: '',
    checkInDate: ''
  });

  const [dormitoryInfo] = useState({
    name: 'KTX Trung Tâm',
    roomType: 'Phòng 4 người (Standard)',
    price: 1500000,
    deposit: 1500000,
    address: '101 Nguyễn Văn Linh, Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  });

  const validateForm = () => {
    let valid = true;
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      studentId: '',
      university: '',
      checkInDate: ''
    };

    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Số điện thoại phải có 10 chữ số';
      valid = false;
    }

    if (!formData.studentId.trim()) {
      errors.studentId = 'Vui lòng nhập mã sinh viên';
      valid = false;
    }

    if (!formData.university.trim()) {
      errors.university = 'Vui lòng nhập trường đại học';
      valid = false;
    }

    if (!formData.checkInDate) {
      errors.checkInDate = 'Vui lòng chọn ngày nhận phòng';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Calculate total payment
      const durationMonths = parseInt(formData.duration);
      const totalPayment = dormitoryInfo.price * durationMonths;
      
      // Store booking information in local storage for the payment page
      try {
        localStorage.setItem('bookingInfo', JSON.stringify({
          ...formData,
          dormitory: dormitoryInfo,
          totalPayment,
        }));
        
        // Navigate to payment page
        router.push('/booking/payment');
      } catch (error) {
        console.error('Error saving booking info:', error);
        alert('Có lỗi xảy ra khi lưu thông tin đặt phòng. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Booking Form */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Thông tin cá nhân</h2>
            <p className="text-blue-100">Vui lòng điền đầy đủ thông tin để tiếp tục đặt phòng</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                    placeholder="Nguyễn Văn A"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                    placeholder="example@gmail.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.email}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                    placeholder="0123456789"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Mã sinh viên
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.studentId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                    placeholder="SV12345"
                  />
                  {formErrors.studentId && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.studentId}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Trường Đại học
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.university ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                    placeholder="Đại học Bách Khoa Đà Nẵng"
                  />
                  {formErrors.university && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.university}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all duration-200
                      ${formErrors.checkInDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'}`}
                  />
                  {formErrors.checkInDate && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.checkInDate}
                    </p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Thời hạn (tháng)
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200"
                  >
                    <option value="6">6 tháng</option>
                    <option value="12">12 tháng</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-medium transition duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                >
                  <span>Tiếp tục đến thanh toán</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Booking Summary */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Thông tin đặt phòng</h2>
            <p className="text-blue-200 text-sm">Chi tiết về phòng bạn sắp đặt</p>
          </div>
          
          <div className="p-6">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-40 z-10"></div>
              <img 
                src={dormitoryInfo.image} 
                alt={dormitoryInfo.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold drop-shadow-md">{dormitoryInfo.name}</h3>
                <p className="text-white text-sm drop-shadow-md">{dormitoryInfo.roomType}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium text-gray-700">Địa chỉ</h3>
                  <p className="text-gray-900">{dormitoryInfo.address}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Giá phòng/tháng</h3>
                  <p className="text-gray-900 font-semibold">{dormitoryInfo.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Tiền đặt cọc</h3>
                  <p className="text-gray-900 font-semibold">{dormitoryInfo.deposit.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Thời hạn</h3>
                  <p className="text-gray-900 font-semibold">{formData.duration} tháng</p>
                </div>
              </div>
              
              <div className="border-t pt-4 bg-blue-50 -mx-6 -mb-6 p-6 mt-6">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Tổng thanh toán</span>
                  <span className="text-blue-600 text-xl">{(formData.duration ? parseInt(formData.duration) * dormitoryInfo.price + dormitoryInfo.deposit : 0).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Bao gồm tiền đặt cọc và tiền phòng {formData.duration || 6} tháng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 