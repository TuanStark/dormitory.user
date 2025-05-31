'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Room, Building } from '@/lib/type';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import ProgressBar from './_components/ProgressBar';
import UserInfoForm from './_components/UserInfoForm';
import PaymentMethodForm from './_components/PaymentMethodForm';
import RoomSummary from './_components/RoomSummary';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface BookingData {
  room: Room;
  building: Building;
  startDate: string;
  endDate: string;
  totalAmount: number;
  stayDuration?: number;
}

interface UserBookingInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  identityCard: string; // CMND/CCCD
  address: string;
  note: string;
}

// Các bước trong quy trình đặt phòng
enum BookingStep {
  USER_INFO = 1,
  PAYMENT_METHOD = 2,
  CONFIRMATION = 3
}

// Phương thức thanh toán
enum PaymentMethod {
  VNPAY = 'vnpay',
  BANK_TRANSFER = 'bank_transfer'
}

export default function BookingVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const roomId = searchParams.get('roomId') as string;
  const dormId = searchParams.get('dormId') as string;
  
  // State quản lý quy trình
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.USER_INFO);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.VNPAY);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  // State cho ngày nhận phòng và thời gian lưu trú
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [stayDuration, setStayDuration] = useState<number>(30); // Mặc định 30 ngày
  
  // State quản lý UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Kiểm tra đăng nhập
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    router.push(`/auth/login?returnUrl=${encodeURIComponent(`/booking/verify?roomId=${roomId}&dormId=${dormId}`)}`);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Đang chuyển hướng đến trang đăng nhập...</div>
      </div>
    );
  }
  
  // Kiểm tra tham số URL
  if (!roomId || !dormId) {
    router.push('/dormitories');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Thiếu thông tin phòng. Đang chuyển hướng...</div>
      </div>
    );
  }
  
  // Xử lý khi hoàn thành bước 1 (thông tin người dùng)
  const handleUserInfoSuccess = (newBookingId: string) => {
    setBookingId(newBookingId);
    setCurrentStep(BookingStep.PAYMENT_METHOD);
  };
  
  // Xử lý khi hoàn thành bước 2 (phương thức thanh toán)
  const handlePaymentMethodSuccess = (method: PaymentMethod) => {
    setPaymentMethod(method);
    
    if (method === PaymentMethod.VNPAY) {
      router.push(`/booking/payment?bookingId=${bookingId}&method=vnpay`);
    } else {
      router.push(`/booking/bank-transfer?bookingId=${bookingId}`);
    }
  };
  
  // Xử lý quay lại bước trước
  const handlePrevStep = () => {
    if (currentStep > BookingStep.USER_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner
        title="Đặt phòng ký túc xá"
        subtitle="Hoàn tất thông tin để đặt phòng"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đặt phòng', href: '#' }
        ]}
        height="medium"
      />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress bar hiện đại và đẹp mắt */}
        <ProgressBar currentStep={currentStep} BookingStep={BookingStep} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Bước 1: Thông tin người dùng */}
            {currentStep === BookingStep.USER_INFO && (
              <div className="flex flex-col lg:flex-row gap-8">
                <UserInfoForm 
                  checkInDate={checkInDate}
                  stayDuration={stayDuration}
                  roomId={roomId}
                  onSuccess={handleUserInfoSuccess}
                />
                
                {/* Thông tin phòng bên phải */}
                <RoomSummary roomId={roomId} />
              </div>
            )}
            
            {/* Bước 2: Phương thức thanh toán */}
            {currentStep === BookingStep.PAYMENT_METHOD && (
              <div className="">
                <PaymentMethodForm 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  bookingId={bookingId!}
                  onSuccess={handlePaymentMethodSuccess}
                />
                
                {/* Thông tin phòng bên phải */}
                {/* <RoomSummary roomId={roomId} /> */}
              </div>
            )}

            {/* Nút điều hướng */}
            {currentStep === BookingStep.PAYMENT_METHOD && (
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Quay lại
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 