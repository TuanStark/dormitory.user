'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { createBooking } from '../../../../../lib/api/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface UserBookingInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  identityCard: string;
  address: string;
  note: string;
}

interface UserInfoFormProps {
  checkInDate: string;
  stayDuration: number;
  roomId: string;
  onSuccess: (bookingId: string) => void;
}

export default function UserInfoForm({
  checkInDate,
  stayDuration,
  roomId,
  onSuccess
}: UserInfoFormProps) {
  const session = useSession();
  const router = useRouter();
  
  const userId = session?.data?.user.id;
  const userEmail = session?.data?.user.email;
  const accessToken = session?.data?.user?.accessToken;
  
  // State cho dữ liệu người dùng
  const [userData, setUserData] = useState<UserBookingInfo>({
    fullName: session?.data?.user?.name || '',
    phoneNumber: '',
    email: userEmail || '',
    identityCard: '',
    address: '',
    note: ''
  });
  
  // State cho lỗi form
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  // State cho lỗi từ server
  const [serverError, setServerError] = useState<string | null>(null);
  
  // State cho trạng thái loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State cho ngày nhận phòng và thời gian lưu trú
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<string>(checkInDate);
  const [selectedStayDuration, setSelectedStayDuration] = useState<number>(stayDuration);

  useEffect(() => {
    if (!userId || !accessToken) return;
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/google/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setUserData(prev => ({
              ...prev,
              fullName: result.data.fullName || prev.fullName,
              phoneNumber: result.data.phoneNumber || prev.phoneNumber,
              email: result.data.email || userEmail || prev.email,
              identityCard: result.data.identityCard || prev.identityCard,
              address: result.data.address || prev.address,
              note: result.data.note || prev.note
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, [userId, accessToken, userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Xóa lỗi khi người dùng sửa trường đó
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCheckInDate(e.target.value);
  };

  const handleStayDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStayDuration(parseInt(e.target.value));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!userData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!userData.phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(userData.phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ (10 số)';
    }
    
    if (!userData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!userData.identityCard.trim()) {
      errors.identityCard = 'Vui lòng nhập CMND/CCCD';
    } else if (!/^[0-9]{9,12}$/.test(userData.identityCard)) {
      errors.identityCard = 'CMND/CCCD không hợp lệ (9-12 số)';
    }
    
    if (!userData.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setServerError(null);
    
    // Tạo FormData để gửi đến server action
    const formData = new FormData();
    formData.append('roomId', roomId);
    formData.append('fullName', userData.fullName);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('email', userData.email);
    formData.append('identityCard', userData.identityCard);
    formData.append('address', userData.address);
    formData.append('note', userData.note || '');
    formData.append('checkInDate', selectedCheckInDate);
    formData.append('stayDuration', selectedStayDuration.toString());
    
    
    try {
      const result = await createBooking(formData);
      
      if (result && result.error) {
        setServerError(result.error);
      } else if (result && result.success && result.bookingId) {
        // Gọi callback để chuyển sang bước tiếp theo
        onSuccess(result.bookingId);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError('Có lỗi xảy ra khi gửi biểu mẫu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="w-full lg:w-7/12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-5">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Thông tin người đặt
          </h2>
        </div>
        
        <div className="p-8">
          {serverError && (
            <motion.div 
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {serverError}
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Họ và tên <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    className={`text-gray-700 w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out ${formErrors.fullName ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'}`}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                {formErrors.fullName && <p className="text-red-500 text-sm mt-1.5 flex items-center"><span className="mr-1">•</span>{formErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Số điện thoại <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className={`text-gray-700 w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out ${formErrors.phoneNumber ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'}`}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1.5 flex items-center"><span className="mr-1">•</span>{formErrors.phoneNumber}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={`text-gray-700 w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out ${formErrors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'}`}
                    readOnly
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-sm mt-1.5 flex items-center"><span className="mr-1">•</span>{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">CMND/CCCD <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="identityCard"
                    value={userData.identityCard}
                    onChange={handleChange}
                    className={`text-gray-700 w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out ${formErrors.identityCard ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'}`}
                    placeholder="Nhập số CMND/CCCD"
                  />
                </div>
                {formErrors.identityCard && <p className="text-red-500 text-sm mt-1.5 flex items-center"><span className="mr-1">•</span>{formErrors.identityCard}</p>}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2 font-medium">Địa chỉ <span className="text-red-500">*</span></label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className={`text-gray-700 w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:bg-white transition-all duration-200 ease-in-out ${formErrors.address ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'}`}
                  placeholder="Nhập địa chỉ"
                />
              </div>
              {formErrors.address && <p className="text-red-500 text-sm mt-1.5 flex items-center"><span className="mr-1">•</span>{formErrors.address}</p>}
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Ngày nhận phòng <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={selectedCheckInDate}
                    onChange={handleCheckInDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-gray-700 w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Thời gian lưu trú <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    value={selectedStayDuration}
                    onChange={handleStayDurationChange}
                    className="text-gray-700 w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out appearance-none"
                  >
                    <option value={30}>1 tháng (30 ngày)</option>
                    <option value={90}>3 tháng (90 ngày)</option>
                    <option value={180}>6 tháng (180 ngày)</option>
                    <option value={365}>1 năm (365 ngày)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2 font-medium">Ghi chú</label>
              <div className="relative group">
                <div className="absolute top-3 left-3 pointer-events-none text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <textarea
                  name="note"
                  value={userData.note}
                  onChange={handleChange}
                  className="text-gray-700 w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                  placeholder="Nhập ghi chú nếu có"
                  rows={3}
                ></textarea>
              </div>
            </motion.div>
            <motion.div 
              className="mt-8"
              variants={itemVariants}
            >
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={false}
                  animate={isSubmitting ? { x: "100%" } : { x: "-100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
                <div className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Tiếp tục
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
} 