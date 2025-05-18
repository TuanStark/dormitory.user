'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


interface UserBookingInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  identityCard: string;
  address: string;
  note: string;
}

interface UserInfoFormProps {
  userInfo: UserBookingInfo;
  formErrors: {[key: string]: string};
  checkInDate: string;
  stayDuration: number;
  handleUserInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckInDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStayDurationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function UserInfoForm({
  userInfo,
  formErrors,
  checkInDate,
  stayDuration,
  handleUserInfoChange,
  handleCheckInDateChange,
  handleStayDurationChange
}: UserInfoFormProps) {
  const session = useSession();
  const userId = session?.data?.user.id;
  const userEmail = session?.data?.user.email;
  const accessToken = session?.data?.user?.accessToken;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userId || !accessToken) return;
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const userData = await response.json();
        console.log(userData);
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, [userId, accessToken]);


  return (
    <div className="w-full lg:w-7/12">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Thông tin người đặt</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleUserInfoChange}
              className={`text-gray-600 w-full p-2 border rounded-lg ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nhập họ và tên"
            />
            {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleUserInfoChange}
              className={`text-gray-600 w-full p-2 border rounded-lg ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nhập số điện thoại"
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className={`text-gray-600 w-full p-2 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nhập email"
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">CMND/CCCD <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="identityCard"
              value={userInfo.identityCard}
              onChange={handleUserInfoChange}
              className={`text-gray-600 w-full p-2 border rounded-lg ${formErrors.identityCard ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Nhập số CMND/CCCD"
            />
            {formErrors.identityCard && <p className="text-red-500 text-sm mt-1">{formErrors.identityCard}</p>}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Địa chỉ <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleUserInfoChange}
            className={`text-gray-600 w-full p-2 border rounded-lg ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Nhập địa chỉ"
          />
          {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Ngày nhận phòng <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={checkInDate}
              onChange={handleCheckInDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Thời gian lưu trú <span className="text-red-500">*</span></label>
            <select
              value={stayDuration}
              onChange={handleStayDurationChange}
              className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value={30}>1 tháng (30 ngày)</option>
              <option value={90}>3 tháng (90 ngày)</option>
              <option value={180}>6 tháng (180 ngày)</option>
              <option value={365}>1 năm (365 ngày)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Ghi chú</label>
          <textarea
            name="note"
            value={userInfo.note}
            onChange={handleUserInfoChange}
            className="text-gray-600 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Nhập ghi chú nếu có"
            rows={3}
          ></textarea>
        </div>
      </form>
    </div>
  );
} 