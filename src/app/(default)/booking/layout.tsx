'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const BookingSteps = () => {
  const pathname = usePathname();
  
  const steps = [
    { id: 1, name: 'Xác nhận thông tin', path: '/booking/verify' },
    { id: 2, name: 'Thanh toán', path: '/booking/payment' },
    { id: 3, name: 'Hoàn tất đặt phòng', path: '/booking/complete' }
  ];

  // Determine current step based on path
  let currentStep = 1;
  if (pathname.includes('/booking/payment')) {
    currentStep = 2;
  } else if (pathname.includes('/booking/complete')) {
    currentStep = 3;
  }

  return (
    <div className="w-full py-8">
      <div className="relative flex items-center justify-between">
        {/* Connector lines with gradient */}
        <div className="absolute top-1/2 left-0 right-0 flex -translate-y-1/2">
          <div className={`h-1 flex-1 rounded-full transition-all duration-500 ease-in-out ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`h-1 flex-1 rounded-full ml-1 transition-all duration-500 ease-in-out ${currentStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-200'}`}></div>
        </div>
        
        {/* Steps with circles */}
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            {/* Step circle with animation */}
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-md transition-all duration-300
                ${currentStep >= step.id 
                  ? 'border-blue-600 bg-gradient-to-br from-blue-500 to-blue-700 text-white transform scale-110' 
                  : 'border-gray-300 bg-white text-gray-500'
                } font-semibold text-sm`}
            >
              {currentStep > step.id ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            
            {/* Step label with animation */}
            <div className={`mt-3 text-sm font-medium text-center w-max transition-all duration-300
              ${currentStep >= step.id ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}
            >
              {step.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Đặt phòng ký túc xá</h1>
        <p className="text-center text-gray-600 mb-10">Chỉ vài bước đơn giản để đặt phòng ký túc xá mong muốn</p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <BookingSteps />
        </div>
        
        <div className="mt-8 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
} 