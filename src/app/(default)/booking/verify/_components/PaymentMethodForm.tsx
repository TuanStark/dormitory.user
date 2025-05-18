'use client';

import React from 'react';
import formatCurrency from '@/lib/common/currentcy';
import Image from 'next/image';

enum PaymentMethod {
  VNPAY = 'vnpay',
  BANK_TRANSFER = 'bank_transfer'
}

interface BookingData {
  totalAmount: number;
  stayDuration?: number;
}

interface PaymentMethodFormProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  bookingData: BookingData;
}

export default function PaymentMethodForm({
  paymentMethod,
  setPaymentMethod,
  bookingData
}: PaymentMethodFormProps) {
  return (
    <div className="w-full lg:w-7/12">
      <h2 className="text-2xl font-bold mb-6 text-gray-600">Phương thức thanh toán</h2>
      <div className="space-y-4">
        <div 
          className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === PaymentMethod.VNPAY ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onClick={() => setPaymentMethod(PaymentMethod.VNPAY)}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${paymentMethod === PaymentMethod.VNPAY ? 'border-blue-500' : ''}`}>
              {paymentMethod === PaymentMethod.VNPAY && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-600">Thanh toán qua VNPay</p>
              <p className="text-sm text-gray-600">Thanh toán trực tuyến qua cổng VNPay</p>
            </div>
          </div>
        </div>
        
        <div 
          className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === PaymentMethod.BANK_TRANSFER ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onClick={() => setPaymentMethod(PaymentMethod.BANK_TRANSFER)}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center ${paymentMethod === PaymentMethod.BANK_TRANSFER ? 'border-blue-500' : ''}`}>
              {paymentMethod === PaymentMethod.BANK_TRANSFER && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-600">Chuyển khoản ngân hàng</p>
              <p className="text-sm text-gray-600">Chuyển khoản trực tiếp đến tài khoản của chúng tôi</p>
            </div>
          </div>
          
          {/* Hiển thị mã QR khi chọn chuyển khoản ngân hàng */}
          {paymentMethod === PaymentMethod.BANK_TRANSFER && (
            <div className="mt-4 flex flex-col items-center">
              <div className="relative w-64 h-64 border border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="/payment/payment.jpg" 
                  alt="Mã QR thanh toán" 
                  width={256} 
                  height={256} 
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium text-gray-700">Quét mã QR để thanh toán</p>
                <p className="text-sm text-gray-600 mt-1">Số tiền: {formatCurrency(bookingData.totalAmount)}</p>
                <p className="text-sm text-gray-600 mt-1">Nội dung chuyển khoản: <span className="font-medium">PHONG_{bookingData.stayDuration}</span></p>
              </div>
            </div>
          )}
        </div>
        
        {/* Thông tin thanh toán */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2 text-gray-600">Thông tin thanh toán</h3>
          <div className="flex justify-between py-2 border-b text-gray-600">
            <span>Giá phòng:</span>
            <span>{formatCurrency(bookingData.totalAmount)}</span>
          </div>
          <div className="flex justify-between py-2 border-b text-gray-600">
            <span>Thời gian lưu trú:</span>
            <span>{bookingData.stayDuration} ngày</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg text-gray-600">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">{formatCurrency(bookingData.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 