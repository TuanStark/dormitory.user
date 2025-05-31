'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';



/**
 * Hàm server action để tạo đặt phòng mới
 */
export async function createBooking(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  
  console.log('CreateBooking: Session user info', {
    userId,
    userEmail: session?.user?.email,
    hasAccessToken: !!session?.user?.accessToken
  });
  
  if (!session || !userId || !session.user?.accessToken) {
    return { error: 'Bạn cần đăng nhập để đặt phòng' };
  }
  
  // Lấy dữ liệu từ form
  const roomId = formData.get('roomId') as string;
  const fullName = formData.get('fullName') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const email = formData.get('email') as string;
  const identityCard = formData.get('identityCard') as string;
  const address = formData.get('address') as string;
  const note = formData.get('note') as string;
  const checkInDate = formData.get('checkInDate') as string;
  const stayDuration = parseInt(formData.get('stayDuration') as string);
  
  // Kiểm tra dữ liệu
  if (!roomId || !fullName || !phoneNumber || !email || !identityCard || !address || !checkInDate) {
    return { error: 'Vui lòng điền đầy đủ thông tin' };
  }
  
  // Kiểm tra định dạng
  if (!/^[0-9]{10}$/.test(phoneNumber)) {
    return { error: 'Số điện thoại không hợp lệ (10 số)' };
  }
  
  if (!/^[0-9]{9,12}$/.test(identityCard)) {
    return { error: 'CMND/CCCD không hợp lệ (9-12 số)' };
  }
  
  try {
    // Chuyển đổi định dạng ngày tháng từ YYYY-MM-DD sang ISO-8601 DateTime đầy đủ
    const checkInDateISO = new Date(checkInDate);
    checkInDateISO.setHours(12, 0, 0, 0); // Đặt giờ là 12:00:00 để tránh vấn đề múi giờ
    
    // Kiểm tra xem ngày có hợp lệ không
    if (isNaN(checkInDateISO.getTime())) {
      return { error: 'Ngày nhận phòng không hợp lệ' };
    }
    
    console.log('Sending booking request with data:', {
      userId,
      roomId: parseInt(roomId),
      checkInDate: checkInDateISO.toISOString(),
      stayDuration
    });
    
    // Chuyển đổi userId thành số nguyên
    let userIdNumber: number;
    try {
      userIdNumber = parseInt(userId as string);
      if (isNaN(userIdNumber)) {
        throw new Error('userId không phải là số hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi chuyển đổi userId:', error);
      return { error: 'ID người dùng không hợp lệ' };
    }
    
    // Gọi API để tạo đặt phòng
    const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/room-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      body: JSON.stringify({
        userId: userIdNumber,
        userInfo: {
          fullName,
          phoneNumber,
          email,
          identityCard,
          address,
          note
        },
        roomId: parseInt(roomId),
        bookingDate: new Date().toISOString(),
        status: 'PENDING',
        checkInDate: checkInDateISO.toISOString(),
        stayDuration: stayDuration
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return { error: errorData.message || 'Không thể tạo đặt phòng' };
    }
    
    const data = await response.json();
    console.log('Booking API response:', data);
    
    if (!data || !data.data || !data.data.id) {
      return { error: 'Invalid booking response' };
    }
    
    const bookingId = data.data.id;
    console.log('bookingId',bookingId);
    
    // Thay vì chuyển hướng trực tiếp, trả về bookingId để client xử lý
    return { 
      success: true, 
      bookingId: bookingId.toString()
    };
    
  } catch (error) {
    console.error('Lỗi khi tạo đặt phòng:', error);
    return { error: error instanceof Error ? error.message : 'Không thể tạo đặt phòng' };
  }
}

/**
 * Hàm server action để lấy thông tin người dùng
 */
export async function getUserInfo() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.id || !session.user?.accessToken) {
    return null;
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/google/${session.user.email}`, {
      headers: {
        'Authorization': `Bearer ${session.user.accessToken}`
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const userData = await response.json();
    return userData.data;
    
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    return null;
  }
} 