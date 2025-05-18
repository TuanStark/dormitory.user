'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | 'pending'>('pending');
  const [message, setMessage] = useState('Đang xử lý kết quả thanh toán...');

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');

    if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
      setPaymentStatus('success');
      setMessage('Thanh toán thành công! Cảm ơn bạn đã đặt phòng.');
    } else {
      setPaymentStatus('error');
      setMessage('Thanh toán thất bại. Vui lòng thử lại sau.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Kết quả thanh toán"
        subtitle={message}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Thanh toán', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            {paymentStatus === 'success' ? (
              <div className="text-green-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : paymentStatus === 'error' ? (
              <div className="text-red-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ) : (
              <div className="text-blue-500 mb-6">
                <svg className="animate-spin h-16 w-16 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4">
              {paymentStatus === 'success' ? 'Thanh toán thành công!' : 
               paymentStatus === 'error' ? 'Thanh toán thất bại' : 
               'Đang xử lý...'}
            </h2>
            
            <p className="text-gray-600 mb-8">
              {message}
            </p>

            <div className="space-x-4">
              <Link 
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Về trang chủ
              </Link>
              
              {paymentStatus === 'error' && (
                <Link 
                  href="/booking/verify"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition"
                >
                  Thử lại
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 