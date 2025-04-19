'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define interfaces for our data
interface DormitoryInfo {
  name: string;
  roomType: string;
  address: string;
  price: number;
  deposit: number;
}

interface BookingInfo {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  university: string;
  checkInDate: string;
  duration: string;
  dormitory: DormitoryInfo;
  totalPayment?: number;
}

interface PaymentInfo {
  method: string;
  amount: number;
  date: string;
  status: string;
  reference: string;
}

export default function CompletePage() {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to get data from localStorage first, then sessionStorage as backup
    try {
      // Retrieve booking information
      let storedBookingInfo = localStorage.getItem('bookingInfo');
      if (!storedBookingInfo) {
        storedBookingInfo = sessionStorage.getItem('bookingInfo');
      }

      // Retrieve payment information
      let storedPaymentInfo = localStorage.getItem('paymentInfo');
      if (!storedPaymentInfo) {
        storedPaymentInfo = sessionStorage.getItem('paymentInfo');
      }
      
      if (storedBookingInfo && storedPaymentInfo) {
        setBookingInfo(JSON.parse(storedBookingInfo));
        setPaymentInfo(JSON.parse(storedPaymentInfo));
      } else {
        // Redirect to verification page if no info is available
        setError('Không tìm thấy thông tin đặt phòng hoặc thanh toán');
      }
    } catch (error) {
      console.error('Error retrieving booking or payment info:', error);
      setError('Có lỗi xảy ra khi tải thông tin. Vui lòng thử lại.');
    }
  }, [router]);

  const handleRetry = () => {
    router.push('/booking/verify');
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Lỗi</h2>
        <p className="text-red-700 max-w-md mx-auto mb-6">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700"
        >
          Quay lại trang đặt phòng
        </button>
      </div>
    );
  }

  if (!bookingInfo || !paymentInfo) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Đặt phòng thành công!</h2>
        <p className="text-green-700 max-w-md mx-auto">
          Cảm ơn bạn đã đặt phòng tại ký túc xá của chúng tôi. Thông tin chi tiết về đặt phòng đã được gửi đến email của bạn.
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-50 border-b border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900">Chi tiết đặt phòng</h2>
          <p className="text-blue-700 text-sm mt-1">
            Mã đặt phòng: <span className="font-semibold">{paymentInfo.reference}</span>
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dormitory Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Thông tin ký túc xá</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Tên ký túc xá</p>
                  <p className="font-medium">{bookingInfo.dormitory.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loại phòng</p>
                  <p className="font-medium">{bookingInfo.dormitory.roomType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="font-medium">{bookingInfo.dormitory.address}</p>
                </div>
              </div>
            </div>
            
            {/* Tenant Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Thông tin người thuê</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Họ và tên</p>
                  <p className="font-medium">{bookingInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{bookingInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-medium">{bookingInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trường đại học</p>
                  <p className="font-medium">{bookingInfo.university}</p>
                </div>
              </div>
            </div>
            
            {/* Booking Details */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Chi tiết thuê phòng</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Ngày nhận phòng</p>
                  <p className="font-medium">
                    {(() => {
                      try {
                        return new Date(bookingInfo.checkInDate).toLocaleDateString('vi-VN');
                      } catch (e) {
                        return bookingInfo.checkInDate || 'Không có';
                      }
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Thời hạn</p>
                  <p className="font-medium">{bookingInfo.duration} tháng</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày hết hạn</p>
                  <p className="font-medium">
                    {(() => {
                      try {
                        const checkInDate = new Date(bookingInfo.checkInDate);
                        const expiryDate = new Date(checkInDate);
                        expiryDate.setMonth(expiryDate.getMonth() + parseInt(bookingInfo.duration));
                        return expiryDate.toLocaleDateString('vi-VN');
                      } catch (e) {
                        return 'Chưa xác định';
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Thông tin thanh toán</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                  <p className="font-medium">
                    {paymentInfo.method === 'momo' ? 'Ví điện tử MoMo' : 'Chuyển khoản ngân hàng'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày thanh toán</p>
                  <p className="font-medium">
                    {(() => {
                      try {
                        return new Date(paymentInfo.date).toLocaleString('vi-VN');
                      } catch (e) {
                        return 'Không xác định';
                      }
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p className="font-medium text-green-600">Thành công</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số tiền</p>
                  <p className="font-medium">
                    {(() => {
                      try {
                        return paymentInfo.amount.toLocaleString('vi-VN');
                      } catch (e) {
                        return paymentInfo.amount || 0;
                      }
                    })()} VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Note */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Lưu ý quan trọng
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1 ml-7 list-disc">
              <li>Vui lòng mang theo CMND/CCCD và thẻ sinh viên khi nhận phòng</li>
              <li>Nhận phòng từ 8:00 đến 18:00 hàng ngày</li>
              <li>Liên hệ số điện thoại 1900 1234 trước khi đến nhận phòng 1 ngày</li>
            </ul>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/dormitories" className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition duration-300 text-center">
              Xem thêm ký túc xá khác
            </Link>
            <Link href="/" className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-center">
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 