'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import formatCurrency from '@/lib/common/currentcy';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const bookingId = searchParams.get('bookingId');
  
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    
    if (!bookingId) {
      setError('Không tìm thấy thông tin đặt phòng');
      setLoading(false);
      return;
    }
    
    // Get the uploaded image from localStorage if available
    const storedImage = localStorage.getItem(`payment_image_${bookingId}`);
    if (storedImage) {
      setUploadedImage(storedImage);
    }
    
    const fetchBookingData = async () => {
      try {
        // Trong thực tế sẽ gọi API để lấy thông tin đặt phòng
        const accessToken = session?.user?.accessToken;
        
        // Try to fetch from API if available
        if (accessToken) {
          try {
            // Lấy thông tin đặt phòng
            const bookingResponse = await fetch(`http://localhost:8000/room-booking/${bookingId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            });
            
            if (bookingResponse.ok) {
              let bookingResult;
              try {
                bookingResult = await bookingResponse.json();
              } catch (jsonError) {
                console.error('Error parsing booking response:', jsonError);
                throw new Error('Invalid booking data format');
              }
              
              // Lấy thông tin thanh toán
              try {
                const paymentResponse = await fetch(`http://localhost:8000/payment/booking/${bookingId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                  }
                });
                
                if (paymentResponse.ok) {
                  try {
                    const paymentResult = await paymentResponse.json();
                    
                    // Kết hợp thông tin đặt phòng và thanh toán
                    setBookingData({
                      ...bookingResult.data,
                      payment: paymentResult.data
                    });
                    
                    setLoading(false);
                    return;
                  } catch (jsonError) {
                    console.error('Error parsing payment response:', jsonError);
                    // Tiếp tục với dữ liệu đặt phòng nếu không parse được thanh toán
                  }
                }
              } catch (paymentError) {
                console.error('Error fetching payment data:', paymentError);
                // Tiếp tục với dữ liệu đặt phòng nếu không lấy được thanh toán
                setBookingData(bookingResult.data);
                setLoading(false);
                return;
              }
              
              // Nếu không lấy được thông tin thanh toán
              setBookingData(bookingResult.data);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.error('Error fetching from API:', apiError);
            // Fall back to mock data if API fails
          }
        }
        
        // Fallback to mock data
        const paymentMethod = uploadedImage ? 'Chuyển khoản ngân hàng' : 'VNPay';
        const paymentId = uploadedImage 
          ? 'BTR' + Math.floor(1000000000 + Math.random() * 9000000000) 
          : 'VNP' + Math.floor(1000000000 + Math.random() * 9000000000);
          
        setBookingData({
          id: bookingId,
          totalAmount: 1500000,
          roomName: 'Phòng 101',
          buildingName: 'Ký túc xá A',
          checkInDate: new Date().toLocaleDateString('vi-VN'),
          stayDuration: 30,
          room: {
            id: 'room-101',
            name: 'Phòng 101',
            roomNumber: '101',
            building: {
              id: 'building-a',
              name: 'A'
            }
          },
          payment: {
            id: paymentId,
            method: paymentMethod === 'Chuyển khoản ngân hàng' ? 'BANK_TRANSFER' : 'VNPAY',
            amount: 1500000,
            status: 'COMPLETED',
            createdAt: new Date().toISOString()
          }
        });
        setLoading(false);
      } catch (error) {
        setError('Không thể tải thông tin đặt phòng');
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [bookingId, router, status, session, uploadedImage]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center mb-4">{error}</div>
          <Link href="/" className="block w-full bg-blue-600 py-2 rounded-lg text-white text-center">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Thanh toán thành công"
        subtitle="Đặt phòng của bạn đã được xác nhận"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt phòng', href: '#' },
          { label: 'Thanh toán thành công', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <motion.div 
                className="bg-green-100 rounded-full p-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-2xl font-bold text-center text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thanh toán thành công!
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Cảm ơn bạn đã đặt phòng ký túc xá. Đặt phòng của bạn đã được xác nhận.
            </motion.p>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thông tin thanh toán
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Mã đặt phòng:</span>
                    <span className="font-medium text-gray-800">#{bookingData.id}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Phương thức:</span>
                    <span className="font-medium text-gray-800">
                      {bookingData.payment?.method === 'BANK_TRANSFER' ? 'Chuyển khoản ngân hàng' : 
                       bookingData.payment?.method === 'VNPAY' ? 'VNPay' : 'Không xác định'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Mã giao dịch:</span>
                    <span className="font-medium text-gray-800">{bookingData.payment?.id || 'Không có'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Ngày thanh toán:</span>
                    <span className="font-medium text-gray-800">
                      {bookingData.payment?.createdAt ? new Date(bookingData.payment.createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Trạng thái:</span>
                    <span className="text-green-600 font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {bookingData.payment?.status === 'COMPLETED' ? 'Thành công' : 
                       bookingData.payment?.status === 'FAILED' ? 'Thất bại' : 'Đang xử lý'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Số tiền:</span>
                    <span className="font-medium text-indigo-600">{formatCurrency(bookingData.totalAmount || bookingData.payment?.amount)}</span>
                  </div>
                </div>
              </div>
              
              {uploadedImage && (
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-medium mb-4 text-gray-700">Ảnh xác nhận thanh toán</h3>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                      <Image 
                        src={uploadedImage} 
                        alt="Ảnh xác nhận thanh toán" 
                        width={256} 
                        height={256} 
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg mb-8 shadow-sm border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Thông tin đặt phòng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Phòng:</span>
                    <span className="font-medium text-gray-800">{bookingData.roomName || bookingData.room?.name || 'Phòng 101'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Ký túc xá:</span>
                    <span className="font-medium text-gray-800">{bookingData.buildingName || bookingData.room?.building?.name || 'A'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Ngày nhận phòng:</span>
                    <span className="font-medium text-gray-800">{bookingData.checkInDate}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Thời gian lưu trú:</span>
                    <span className="font-medium text-gray-800">{bookingData.stayDuration} ngày</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start">
                <div className="text-blue-500 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Thông tin quan trọng</h3>
                  <p className="text-blue-700">
                    Vui lòng mang theo CMND/CCCD và biên lai thanh toán khi nhận phòng. Bạn cần có mặt đúng ngày nhận phòng đã đăng ký.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row justify-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                href="/profile/bookings" 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-200"
              >
                Xem đặt phòng của tôi
              </Link>
              <Link 
                href="/" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg text-center transition-colors duration-200"
              >
                Quay lại trang chủ
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 