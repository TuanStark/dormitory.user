'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import formatCurrency from '@/lib/common/currentcy';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDateTime } from '@/lib/common/datetime';

export default function BankTransferPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const bookingId = searchParams.get('bookingId');
  
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
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
            id: 'payment-' + Math.floor(1000000000 + Math.random() * 9000000000),
            method: 'BANK_TRANSFER',
            amount: 1500000,
            status: 'PENDING',
            createdAt: new Date().toISOString()
          }
        });
        setLoading(false);
        
        // Auto-redirect to payment success after 5 seconds
        setTimeout(() => {
          setRedirecting(true);
          router.push(`/booking/payment-success?bookingId=${bookingId}`);
        }, 5000);
        
      } catch (error) {
        setError('Không thể tải thông tin đặt phòng');
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [bookingId, router, status, session]);
  
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
        title="Thanh toán chuyển khoản"
        subtitle="Xác nhận thanh toán đã được ghi nhận"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt phòng', href: '#' },
          { label: 'Thanh toán', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-2xl font-bold text-center text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thông tin thanh toán đã được ghi nhận!
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Chúng tôi đã nhận được thông tin chuyển khoản của bạn. Mã đặt phòng của bạn là: <span className="font-bold text-blue-600">{bookingData.id}</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col md:flex-row gap-8 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {uploadedImage && (
                <div className="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src={uploadedImage} 
                    alt="Ảnh xác nhận thanh toán" 
                    width={256} 
                    height={256} 
                    className="object-contain"
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-gray-700">Thông tin thanh toán</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600"><span className="font-medium">Phương thức:</span> Chuyển khoản ngân hàng</p>
                    <p className="text-gray-600">
                      <span className="font-medium">Trạng thái:</span> 
                      <span className="text-green-600 font-medium">
                        {bookingData.payment?.status === 'COMPLETED' ? 'Đã hoàn tất' : 
                         bookingData.payment?.status === 'FAILED' ? 'Thất bại' : 'Đang xử lý'}
                      </span>
                    </p>
                    <p className="text-gray-600"><span className="font-medium">Số tiền:</span> {formatCurrency(bookingData.totalAmount || bookingData.payment?.amount)}</p>
                    <p className="text-gray-600"><span className="font-medium">Thời gian:</span> {bookingData.payment?.createdAt ? new Date(bookingData.payment.createdAt).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN')}</p>
                    {bookingData.payment?.id && (
                      <p className="text-gray-600"><span className="font-medium">Mã giao dịch:</span> {bookingData.payment.id}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-blue-700">Thông báo</h3>
                  <p className="text-blue-700">
                    Thanh toán của bạn đang được xử lý. Chúng tôi sẽ gửi email xác nhận khi hoàn tất.
                    {redirecting && (
                      <span className="block mt-2 italic">
                        Đang chuyển hướng đến trang xác nhận...
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 border-t border-gray-200 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-medium mb-4 text-gray-700">Thông tin đặt phòng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600"><span className="font-medium">Phòng:</span> {bookingData.roomName || bookingData.room?.name || 'Phòng 101'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600"><span className="font-medium">Ký túc xá:</span> {bookingData.buildingName || bookingData.room?.building?.name || 'A'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600"><span className="font-medium">Ngày nhận phòng:</span> {bookingData.checkInDate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600"><span className="font-medium">Thời gian lưu trú:</span> {bookingData.stayDuration} ngày</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
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