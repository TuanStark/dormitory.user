'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { User } from '@/lib/type';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const userId = session?.user?.id;

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.accessToken) {
      fetchUserProfile();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
      setError('Vui lòng đăng nhập để xem thông tin cá nhân');
    }
  }, [status, session]);

  // Cập nhật formData mỗi khi user thay đổi hoặc khi chuyển sang chế độ chỉnh sửa
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || '',
        citizenId: user.citizenId || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || ''
      });
    }
  }, [user, isEditing]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Không thể lấy thông tin người dùng');
      }

      const responseData = await response.json();
      
      if (responseData.statusCode === 200 && responseData.data) {
        const userData = responseData.data;
        setUser(userData);
        setFormData(userData);
      } else {
        throw new Error('Cấu trúc dữ liệu không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Đã xảy ra lỗi khi lấy thông tin người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Hàm tạo dữ liệu mẫu
  const fillSampleData = () => {
    setFormData({
      ...formData,
      fullName: user?.fullName || 'Nguyễn Văn A',
      phoneNumber: user?.phoneNumber || '0987654321',
      gender: user?.gender || 'Male',
      citizenId: user?.citizenId || '123456789012',
      dateOfBirth: user?.dateOfBirth || '2000-01-01',
      address: user?.address || 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          citizenId: formData.citizenId,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address
        })
      });

      const result = await response.json();
      console.log(result);
      
      if (response.ok && result.statusCode >= 200 && result.statusCode < 300) {
        setUser(prev => ({
          ...prev!,
          ...formData
        }));
        setIsEditing(false);
        toast.success('Cập nhật thông tin thành công');
      } else {
        // Xử lý lỗi từ API một cách an toàn
        const errorMessage = result.message || 'Cập nhật thất bại';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Cập nhật thông tin thất bại. Vui lòng thử lại sau.');
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Chưa cập nhật';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Xử lý dữ liệu phản hồi API nếu nó đến trong đối tượng data
  const getUserData = (responseData: any): User => {
    // Nếu dữ liệu đến trong đối tượng data, sử dụng nó; ngược lại sử dụng đối tượng phản hồi trực tiếp
    return responseData.data || responseData;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h1>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-blue-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h1>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-red-50 p-8 border-b border-red-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-red-800">Không thể tải dữ liệu</h3>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
              
              {status === 'unauthenticated' && (
                <div className="p-8 bg-white text-center">
                  <p className="text-gray-600 mb-6">Đăng nhập để xem và quản lý thông tin cá nhân của bạn</p>
                  <Link href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h1>
            <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Tabs điều hướng */}
          <div className="flex justify-center space-x-2 mb-6">
            <Link 
              href="/profile"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Thông tin cá nhân
            </Link>
            <Link 
              href="/my-bookings"
              className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Đơn đặt phòng
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header profile */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user.fullName} className="object-cover w-full h-full" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white">{user?.fullName || 'Chưa cập nhật'}</h2>
                  <p className="text-blue-100">{user?.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                      {user?.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                  </div>
                </div>
                <div className="md:ml-auto mt-4 md:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile content */}
            <div className="p-8">
              {isEditing ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">Họ và tên</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Nhập họ và tên"
                        value={formData.fullName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">Số điện thoại</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Nhập số điện thoại"
                        value={formData.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">CMND/CCCD</label>
                      <input
                        type="text"
                        name="citizenId"
                        placeholder="Nhập CMND/CCCD"
                        value={formData.citizenId || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">Giới tính</label>
                      <select
                        name="gender"
                        value={formData.gender || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">Ngày sinh</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Nhập ngày sinh"
                        value={formData.dateOfBirth?.split('T')[0] || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-500">Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Họ và tên</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{user?.fullName || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Số điện thoại</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{user?.phoneNumber || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">CMND/CCCD</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{user?.citizenId || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Giới tính</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {user?.gender === 'Male' ? 'Nam' : 
                         user?.gender === 'Female' ? 'Nữ' : 
                         user?.gender === 'Other' ? 'Khác' : 'Chưa cập nhật'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Ngày sinh</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{formatDate(user?.dateOfBirth)}</p>
                    </div>
                    <div className="col-span-full">
                      <h3 className="text-sm font-medium text-gray-500">Địa chỉ</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{user?.address || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Tham gia từ</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{formatDate(user?.createAt)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Trạng thái tài khoản</h3>
                      <p className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user?.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user?.status ? 'Hoạt động' : 'Bị khóa'}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 