'use client';

import React from 'react';
import PageBanner from '@/components/PageBanner';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner 
        title="Giới thiệu về DormSpace"
        subtitle="Nền tảng đặt phòng ký túc xá hàng đầu tại Đà Nẵng"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giới thiệu' }
        ]}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-80 md:h-auto">
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <Image src="/home/KTX.jpg" alt="About" fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Về chúng tôi</h2>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 mb-4">
                  <strong className="text-blue-600">DormSpace</strong> là nền tảng đặt phòng ký túc xá trực tuyến hàng đầu tại Đà Nẵng, kết nối sinh viên với các ký túc xá chất lượng cao trong khu vực.
                </p>
                <p className="text-gray-600 mb-4">
                  Được thành lập vào năm 2023, chúng tôi đã phát triển thành một nền tảng đáng tin cậy giúp hàng nghìn sinh viên tìm được nơi ở phù hợp với nhu cầu và ngân sách của mình.
                </p>
                <p className="text-gray-600">
                  Với sứ mệnh cung cấp dịch vụ tìm kiếm và đặt phòng ký túc xá nhanh chóng, tiện lợi và an toàn, DormSpace cam kết mang đến trải nghiệm tốt nhất cho sinh viên và các đối tác ký túc xá.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh</h3>
              <p className="text-gray-600 mb-4">
                Chúng tôi cam kết đơn giản hóa quá trình tìm kiếm và đặt phòng ký túc xá cho sinh viên, đồng thời hỗ trợ các ký túc xá quản lý hiệu quả công suất phòng và tăng khả năng tiếp cận với sinh viên.
              </p>
              <p className="text-gray-600">
                DormSpace nỗ lực xây dựng một cộng đồng sinh viên kết nối, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau trong hành trình học tập tại Đà Nẵng.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tầm nhìn</h3>
              <p className="text-gray-600 mb-4">
                DormSpace hướng tới việc trở thành nền tảng đặt phòng ký túc xá hàng đầu tại Việt Nam, mở rộng dịch vụ đến các thành phố lớn và khu vực đại học trên cả nước.
              </p>
              <p className="text-gray-600">
                Chúng tôi mong muốn xây dựng một hệ sinh thái hoàn chỉnh cho sinh viên, từ việc tìm kiếm chỗ ở đến các dịch vụ tiện ích hỗ trợ học tập và sinh hoạt trong suốt quá trình học đại học.
              </p>
            </div>
          </div>
        </div>
        
        {/* Core Values */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Giá trị cốt lõi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Minh bạch</h3>
                <p className="text-gray-600 text-center">
                  Chúng tôi cung cấp thông tin chính xác và đầy đủ về các ký túc xá, giá cả và dịch vụ, giúp sinh viên đưa ra quyết định sáng suốt.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">An toàn</h3>
                <p className="text-gray-600 text-center">
                  Bảo mật thông tin cá nhân và đảm bảo các giao dịch thanh toán an toàn là ưu tiên hàng đầu của chúng tôi.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Hiệu quả</h3>
                <p className="text-gray-600 text-center">
                  Chúng tôi không ngừng cải tiến nền tảng để mang đến trải nghiệm đặt phòng nhanh chóng, tiện lợi và thân thiện với người dùng.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Đội ngũ của chúng tôi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-gray-500 text-sm">Ảnh đại diện</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">Nguyễn Văn A</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3 text-center">Đồng sáng lập & CEO</p>
                  <p className="text-gray-600 text-sm text-center">
                    Với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ và bất động sản, anh A đã xây dựng DormSpace từ những ngày đầu tiên.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </main>
    </div>
  );
} 