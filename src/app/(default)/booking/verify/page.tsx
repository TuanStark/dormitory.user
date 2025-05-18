'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Room, Building } from '@/lib/type';
import PageBanner from '@/components/PageBanner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProgressBar from './_components/ProgressBar';
import UserInfoForm from './_components/UserInfoForm';
import PaymentMethodForm from './_components/PaymentMethodForm';
import RoomSummary from './_components/RoomSummary';

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

// Mở rộng kiểu Session để thêm các trường cần thiết
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
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
  const { data: session } = useSession();
  const roomId = searchParams.get('roomId');
  const dormId = searchParams.get('dormId');
  
  // State quản lý dữ liệu
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [userInfo, setUserInfo] = useState<UserBookingInfo>({
    fullName: session?.user?.name || '',
    phoneNumber: '',
    email: session?.user?.email || '',
    identityCard: '',
    address: '',
    note: ''
  });
  
  // State quản lý quy trình
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.USER_INFO);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.VNPAY);
  const [bookingId, setBookingId] = useState<number | null>(null);
  
  // State cho ngày nhận phòng và thời gian lưu trú
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [stayDuration, setStayDuration] = useState<number>(30); // Mặc định 30 ngày
  
  // State quản lý UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingBooking, setProcessingBooking] = useState(false);
  
  // Form validation
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (!roomId || !dormId) return;
    
    setLoading(true);
    
    // Tạo hàm fetch riêng cho mỗi loại dữ liệu
    const fetchRoomData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/room/${roomId}`);
      if (!response.ok) throw new Error('Không thể tải thông tin phòng');
      return response.json();
    };
    
    const fetchBuildingData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/building/${dormId}`);
      if (!response.ok) throw new Error('Không thể tải thông tin ký túc xá');
      return response.json();
    };
    
    // Sử dụng async/await để dễ đọc hơn
    const loadBookingData = async () => {
      try {
        const [roomResponse, buildingResponse] = await Promise.all([
          fetchRoomData(),
          fetchBuildingData()
        ]);
        
        const room = roomResponse.data;
        const building = buildingResponse.data;
        
        if (!room || !building) {
          throw new Error('Dữ liệu không hợp lệ');
        }
        
        // Tính ngày kết thúc dựa trên ngày nhận phòng và thời gian lưu trú
        const startDate = new Date(checkInDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + stayDuration);
        
        setBookingData({
          room,
          building,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          totalAmount: room.price,
          stayDuration
        });
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu đặt phòng:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu đặt phòng');
      } finally {
        setLoading(false);
      }
    };
    
    loadBookingData();
  }, [roomId, dormId, session, checkInDate, stayDuration]);

  // Xử lý thay đổi thông tin người dùng
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
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

  // Xử lý thay đổi ngày nhận phòng
  const handleCheckInDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(e.target.value);
  };

  // Xử lý thay đổi thời gian lưu trú
  const handleStayDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStayDuration(parseInt(e.target.value));
  };

  // Kiểm tra form hợp lệ
  const validateUserInfoForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!userInfo.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!userInfo.phoneNumber.trim()) {
      errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(userInfo.phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ (10 số)';
    }
    
    if (!userInfo.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!userInfo.identityCard.trim()) {
      errors.identityCard = 'Vui lòng nhập CMND/CCCD';
    } else if (!/^[0-9]{9,12}$/.test(userInfo.identityCard)) {
      errors.identityCard = 'CMND/CCCD không hợp lệ (9-12 số)';
    }
    
    if (!userInfo.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý chuyển bước
  const handleNextStep = () => {
    if (currentStep === BookingStep.USER_INFO) {
      if (validateUserInfoForm()) {
        setCurrentStep(BookingStep.PAYMENT_METHOD);
      }
    } else if (currentStep === BookingStep.PAYMENT_METHOD) {
      handleCreateBookingAndPayment();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > BookingStep.USER_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Bước 1: Tạo RoomBooking
  const createBooking = async () => {
    if (!bookingData || !session?.user?.id) {
      setError('Thiếu thông tin người dùng hoặc phòng');
      return null;
    }
    
    setProcessingBooking(true);
    
    try {
      // Lấy token từ session hoặc localStorage nếu cần
      const token = session.accessToken || localStorage.getItem('accessToken') || '';
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: session.user.id,
          roomId: parseInt(roomId as string),
          bookingDate: new Date().toISOString(),
          status: 'PENDING', // Trạng thái ban đầu
          checkInDate: checkInDate,
          stayDuration: stayDuration,
          userInfo: {
            fullName: userInfo.fullName,
            phoneNumber: userInfo.phoneNumber,
            email: userInfo.email,
            identityCard: userInfo.identityCard,
            address: userInfo.address,
            note: userInfo.note
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo đặt phòng');
      }
      
      const data = await response.json();
      return data.data.id; // Trả về ID của booking vừa tạo
      
    } catch (err) {
      console.error('Lỗi khi tạo đặt phòng:', err);
      setError(err instanceof Error ? err.message : 'Không thể tạo đặt phòng');
      return null;
    } finally {
      setProcessingBooking(false);
    }
  };

  // Xử lý tạo booking và thanh toán
  const handleCreateBookingAndPayment = async () => {
    if (!bookingData) return;
    
    try {
      // Tạo booking trước
      const newBookingId = await createBooking();
      
      if (!newBookingId) {
        setError('Không thể tạo đặt phòng');
        return;
      }
      
      setBookingId(newBookingId);
      
      // Xử lý dựa trên phương thức thanh toán
      if (paymentMethod === PaymentMethod.VNPAY) {
        await processVnPayPayment(newBookingId);
      } else if (paymentMethod === PaymentMethod.BANK_TRANSFER) {
        // Chuyển đến trang xác nhận với thông tin chuyển khoản
        router.push(`/booking/bank-transfer?bookingId=${newBookingId}`);
      }
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      setError(err instanceof Error ? err.message : 'Không thể khởi tạo thanh toán');
    }
  };

  // Xử lý thanh toán qua VNPay
  const processVnPayPayment = async (bookingId: number) => {
    if (!bookingData) return;
    
    // Tạo yêu cầu thanh toán VNPay
    const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/payment/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: bookingData.totalAmount,
        orderInfo: `Thanh toan phong ${bookingData.room.roomNumber}`,
        orderType: 'billpayment',
        locale: 'vn',
        returnUrl: `${window.location.origin}/booking/success?bookingId=${bookingId}`,
        ipAddr: '127.0.0.1',
        bookingId: bookingId,
      }),
    });

    const data = await response.json();
    if (data.data?.paymentUrl) {
      window.location.href = data.data.paymentUrl;
    } else {
      throw new Error('Không nhận được URL thanh toán');
    }
  };

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
        className="w-full bg-blue-600 py-2 rounded-lg text-gray-600"
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
        className="w-full bg-blue-600 py-2 rounded-lg text-gray-600"
      >
        Quay lại
      </button>
    </div>
  </div>;

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

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Progress bar hiện đại và đẹp mắt */}
       <ProgressBar currentStep={currentStep} BookingStep={BookingStep} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Bước 1: Thông tin người dùng */}
            {currentStep === BookingStep.USER_INFO && (
              <div className="flex flex-col lg:flex-row gap-8">
                <UserInfoForm 
                  userInfo={userInfo}
                  formErrors={formErrors}
                  checkInDate={checkInDate}
                  stayDuration={stayDuration}
                  handleUserInfoChange={handleUserInfoChange}
                  handleCheckInDateChange={handleCheckInDateChange}
                  handleStayDurationChange={handleStayDurationChange}
                />
                
                {/* Thông tin phòng bên phải */}
                <RoomSummary bookingData={bookingData} />
              </div>
            )}

            {/* Bước 2: Phương thức thanh toán */}
            {currentStep === BookingStep.PAYMENT_METHOD && (
              <div className="flex flex-col lg:flex-row gap-8">
                <PaymentMethodForm 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  bookingData={bookingData}
                />
                
                {/* Thông tin phòng bên phải */}
                <RoomSummary bookingData={bookingData} />
              </div>
            )}

            {/* Nút điều hướng */}
            <div className="mt-8 flex justify-between">
              {currentStep > BookingStep.USER_INFO ? (
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Quay lại
                </button>
              ) : (
                <Link href={`/dormitories/${dormId}`} className="text-gray-600 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Hủy
                </Link>
              )}
              
              <button
                onClick={handleNextStep}
                disabled={processingBooking}
                className={`px-6 py-2 ${processingBooking ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition flex items-center`}
              >
                {processingBooking ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Đang xử lý...
                  </>
                ) : currentStep === BookingStep.USER_INFO ? 'Tiếp theo' : 'Thanh toán ngay'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 