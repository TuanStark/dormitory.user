'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PaymentPage() {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    // Retrieve booking information from localStorage
    try {
      const storedBookingInfo = localStorage.getItem('bookingInfo');
      if (storedBookingInfo) {
        const parsedInfo = JSON.parse(storedBookingInfo);
        setBookingInfo(parsedInfo);
        
        // Backup in sessionStorage as well for extra safety
        sessionStorage.setItem('bookingInfo', storedBookingInfo);
      } else {
        // Try to retrieve from sessionStorage if localStorage fails
        const sessionInfo = sessionStorage.getItem('bookingInfo');
        if (sessionInfo) {
          setBookingInfo(JSON.parse(sessionInfo));
        } else {
          // Redirect to verification page if no booking info is available
          router.push('/booking/verify');
        }
      }
    } catch (error) {
      console.error('Error retrieving booking info:', error);
      setPaymentError('Có lỗi khi tải thông tin đặt phòng. Vui lòng thử lại.');
    }
  }, [router]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    setLoading(true);
    setPaymentError('');
    
    // Simulate payment processing
    setTimeout(() => {
      try {
        // Store payment information for confirmation page
        const paymentInfo = {
          method: selectedPaymentMethod,
          amount: bookingInfo?.dormitory.price * parseInt(bookingInfo?.duration) + bookingInfo?.dormitory.deposit,
          date: new Date().toISOString(),
          status: 'success',
          reference: `REF${Math.floor(100000 + Math.random() * 900000)}`
        };
        
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        
        // Navigate to confirmation page
        router.push('/booking/complete');
      } catch (error) {
        console.error('Error processing payment:', error);
        setPaymentError('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
        setLoading(false);
      }
    }, 2000);
  };

  if (!bookingInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        {paymentError ? (
          <div className="text-red-500 text-center mb-4">{paymentError}</div>
        ) : (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        )}
        {paymentError && (
          <button 
            onClick={() => router.push('/booking/verify')} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Quay lại trang xác nhận
          </button>
        )}
      </div>
    );
  }

  const totalAmount = bookingInfo.dormitory.price * parseInt(bookingInfo.duration) + bookingInfo.dormitory.deposit;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Payment Methods */}
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Phương thức thanh toán</h2>
          
          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-lg mb-6">
              {paymentError}
            </div>
          )}
          
          <div className="space-y-4">
            {/* MoMo */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 
                ${selectedPaymentMethod === 'momo' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-300 hover:border-gray-400'}`}
              onClick={() => handlePaymentMethodChange('momo')}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 relative flex-shrink-0 mr-4">
                  <div className="absolute inset-0 bg-pink-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">MoMo</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">Thanh toán qua ví MoMo</h3>
                  <p className="text-sm text-gray-600">Quét mã QR để thanh toán nhanh chóng</p>
                </div>
                <div className="ml-4">
                  <div className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
                    ${selectedPaymentMethod === 'momo' ? 'bg-pink-500 border-pink-500' : 'bg-white'}`}
                  >
                    {selectedPaymentMethod === 'momo' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPaymentMethod === 'momo' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg border border-gray-300 w-48 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">QR Code MoMo</p>
                        <div className="bg-gray-200 w-32 h-32 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Vui lòng mở ứng dụng MoMo trên điện thoại và quét mã QR để thanh toán
                  </p>
                </div>
              )}
            </div>
            
            {/* Bank Transfer */}
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 
                ${selectedPaymentMethod === 'bank' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}`}
              onClick={() => handlePaymentMethodChange('bank')}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 relative flex-shrink-0 mr-4">
                  <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">Chuyển khoản ngân hàng</h3>
                  <p className="text-sm text-gray-600">Chuyển khoản trực tiếp đến tài khoản của chúng tôi</p>
                </div>
                <div className="ml-4">
                  <div className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
                    ${selectedPaymentMethod === 'bank' ? 'bg-blue-500 border-blue-500' : 'bg-white'}`}
                  >
                    {selectedPaymentMethod === 'bank' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPaymentMethod === 'bank' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Ngân hàng:</span> Vietcombank</li>
                      <li><span className="font-medium">Số tài khoản:</span> 1234567890</li>
                      <li><span className="font-medium">Chủ tài khoản:</span> CÔNG TY DORMSPACE</li>
                      <li><span className="font-medium">Nội dung chuyển khoản:</span> {bookingInfo.fullName} - {bookingInfo.studentId}</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Sau khi chuyển khoản thành công, vui lòng chọn "Xác nhận thanh toán" để hoàn tất đặt phòng.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  Đang xử lý...
                </>
              ) : (
                'Xác nhận thanh toán'
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Bằng cách nhấn nút xác nhận, bạn đồng ý với các điều khoản và điều kiện của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      
      {/* Payment Summary */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 className="text-xl font-semibold mb-4">Tóm tắt thanh toán</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Ký túc xá</h3>
              <p className="text-gray-900">{bookingInfo.dormitory.name}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Loại phòng</h3>
              <p className="text-gray-900">{bookingInfo.dormitory.roomType}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Địa chỉ</h3>
              <p className="text-gray-900">{bookingInfo.dormitory.address}</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-700">Người đặt</h3>
              <p className="text-gray-900">{bookingInfo.fullName}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Ngày nhận phòng</h3>
              <p className="text-gray-900">{new Date(bookingInfo.checkInDate).toLocaleDateString('vi-VN')}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Thời hạn</h3>
              <p className="text-gray-900">{bookingInfo.duration} tháng</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-700">Giá phòng/tháng</h3>
              <p className="text-gray-900">{bookingInfo.dormitory.price.toLocaleString('vi-VN')} VNĐ</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Tiền đặt cọc</h3>
              <p className="text-gray-900">{bookingInfo.dormitory.deposit.toLocaleString('vi-VN')} VNĐ</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Tổng thanh toán</span>
                <span className="text-blue-600">{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Bao gồm tiền đặt cọc và tiền phòng {bookingInfo.duration} tháng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 