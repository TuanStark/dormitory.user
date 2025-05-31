'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const bookingId = searchParams.get('bookingId');
  const method = searchParams.get('method');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }
    
    if (!bookingId) {
      setError('Không tìm thấy thông tin đặt phòng');
      setLoading(false);
      return;
    }
    
    if (method !== 'vnpay') {
      setError('Phương thức thanh toán không hợp lệ');
      setLoading(false);
      return;
    }
    
    const createVnPayUrl = async () => {
      try {
        // Trong thực tế, sẽ gọi API để tạo URL thanh toán VNPay
        // Ở đây tạm thời chuyển hướng đến trang giả lập
        setTimeout(() => {
          // Chuyển hướng đến trang thanh toán VNPay (giả lập)
          window.location.href = `/booking/payment-success?bookingId=${bookingId}`;
        }, 2000);
      } catch (error) {
        setError('Không thể khởi tạo thanh toán');
        setLoading(false);
      }
    };
    
    createVnPayUrl();
  }, [bookingId, method, router, status]);
  
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
        title="Thanh toán"
        subtitle="Đang chuyển hướng đến cổng thanh toán VNPay"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt phòng', href: '#' },
          { label: 'Thanh toán', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Đang chuyển hướng đến VNPay</h1>
            <p className="text-center text-gray-600 mb-8">
              Vui lòng không đóng trang này. Bạn sẽ được chuyển đến cổng thanh toán VNPay trong giây lát...
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 