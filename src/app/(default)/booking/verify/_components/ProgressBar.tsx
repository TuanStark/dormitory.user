'use client';

import React from 'react';
import { motion } from 'framer-motion';

enum BookingStep {
  USER_INFO = 1,
  PAYMENT_METHOD = 2,
  CONFIRMATION = 3
}

interface ProgressBarProps {
  currentStep: BookingStep;
  BookingStep: typeof BookingStep;
}

export default function ProgressBar({ currentStep, BookingStep }: ProgressBarProps) {
  const steps = [
    { 
      id: BookingStep.USER_INFO, 
      name: 'Thông tin người dùng', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      id: BookingStep.PAYMENT_METHOD, 
      name: 'Phương thức thanh toán', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      )
    },
    { 
      id: BookingStep.CONFIRMATION, 
      name: 'Xác nhận', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
  ];

  return (
    <div className="mb-14 px-4 mt-2">
      <div className="flex items-center justify-between relative">
        {/* Thanh tiến trình nền */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full z-0"></div>
        
        {/* Thanh tiến trình hoàn thành */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 z-0">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: currentStep === 1 ? "0%" : 
                    currentStep === 2 ? "50%" : "100%" 
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        
        {/* Các bước */}
        {steps.map((step, index) => {
          const isActive = currentStep >= step.id;
          const isCompleted = currentStep > step.id;
          const isLast = index === steps.length - 1;
          const isFirst = index === 0;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Vòng tròn hiển thị trạng thái */}
              <motion.div 
                className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm
                  ${isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-200 text-gray-400 shadow-md'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isActive ? 1 : 0.9,
                  opacity: 1,
                  boxShadow: isActive ? '0 10px 25px -5px rgba(59, 130, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {isCompleted ? (
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-7 w-7" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </motion.svg>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                )}
              </motion.div>
              
              {/* Tên bước */}
              <motion.div 
                className={`mt-4 text-sm font-medium ${isActive ? 'text-indigo-700' : 'text-gray-500'}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              >
                {step.name}
              </motion.div>
              
              {/* Số thứ tự */}
              <motion.div
                className={`absolute -top-6 text-xs font-bold px-2 py-1 rounded-full
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-100 text-gray-500'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
              >
                Bước {step.id}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}