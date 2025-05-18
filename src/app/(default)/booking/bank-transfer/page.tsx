'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import formatCurrency from '@/lib/common/currentcy';

interface BookingData {
  id: number;
  roomNumber: string;
  buildingName: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  stayDuration: number;
  status: string;
}

export default function BankTransferPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const bookingId = searchParams.get('bookingId');
  
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!bookingId || !session) return;
    
    const fetchBookingData = async () => {
      try {
        const token = session.accessToken || localStorage.getItem('accessToken') || '';
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/booking/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Không thể tải thông tin đặt phòng');
        }
        
        const data = await response.json();
        
        if (!data.data) {
          throw new Error('Không tìm thấy thông tin đặt phòng');
        }
        
        // Định dạng dữ liệu cho giao diện
        setBookingData({
          id: data.data.id,
          roomNumber: data.data.room?.roomNumber || 'N/A',
          buildingName: data.data.room?.building?.name || 'N/A',
          totalAmount: data.data.room?.price || 0,
          startDate: data.data.checkInDate || new Date().toISOString().split('T')[0],
          endDate: data.data.checkOutDate || new Date().toISOString().split('T')[0],
          stayDuration: data.data.stayDuration || 30,
          status: data.data.status || 'PENDING'
        });
        
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [bookingId, session]);
  
  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!session && !loading) {
      // Redirect to login if not logged in
      router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname + window.location.search));
    }
  }, [session, loading, router]);
  
  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>;
  
  if (!session) return <div className="flex justify-center items-center min-h-screen">
    <div>Đang chuyển hướng đến trang đăng nhập...</div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-red-500 text-center mb-4">{error}</div>
      <button 
        onClick={() => router.back()} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Quay lại
      </button>
    </div>
  </div>;
  
  if (!bookingData) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-4">Không tìm thấy thông tin đặt phòng</div>
      <button 
        onClick={() => router.back()} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Quay lại
      </button>
    </div>
  </div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Thanh toán chuyển khoản"
        subtitle="Vui lòng hoàn tất thanh toán để xác nhận đặt phòng"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt phòng', href: '#' },
          { label: 'Thanh toán', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-700">Thông tin chuyển khoản</h2>
              <p className="text-gray-600 mt-2">Vui lòng chuyển khoản theo thông tin bên dưới để hoàn tất đặt phòng</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Mã QR */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden">
                  <Image 
                    src="/payment/payment.jpg" 
                    alt="Mã QR thanh toán" 
                    width={256} 
                    height={256} 
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Quét mã QR để thanh toán nhanh chóng</p>
              </div>
              
              {/* Thông tin chuyển khoản */}
              <div className="w-full md:w-1/2">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-gray-700">Thông tin ngân hàng</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngân hàng:</span>
                        <span className="font-medium">Vietcombank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số tài khoản:</span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chủ tài khoản:</span>
                        <span className="font-medium">CÔNG TY TNHH KÝ TÚC XÁ</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-700">Chi tiết giao dịch</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã đặt phòng:</span>
                        <span className="font-medium">#{bookingData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phòng:</span>
                        <span className="font-medium">{bookingData.roomNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số tiền:</span>
                        <span className="font-medium text-blue-600">{formatCurrency(bookingData.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nội dung CK:</span>
                        <span className="font-medium">PHONG_{bookingData.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Lưu ý:</span> Sau khi chuyển khoản thành công, vui lòng chờ hệ thống xác nhận (trong vòng 24h). Bạn có thể kiểm tra trạng thái đặt phòng trong mục "Đặt phòng của tôi".
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Link href="/profile/bookings" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-600">
                Xem đặt phòng của tôi
              </Link>
              <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 