"use client";

import PageBanner from '@/components/PageBanner';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dữ liệu mẫu cho một ký túc xá cụ thể
const dormitory = {
  id: 1,
  name: "KTX Đại học Đà Nẵng",
  address: "Số 1 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
  description: "Ký túc xá Đại học Đà Nẵng là một trong những ký túc xá hiện đại nhất khu vực miền Trung. Được xây dựng vào năm 2018, ký túc xá cung cấp chỗ ở tiện nghi cho hơn 2000 sinh viên từ các trường thành viên của Đại học Đà Nẵng.\n\nVới vị trí thuận lợi, chỉ cách trường Đại học Bách Khoa và Đại học Kinh tế khoảng 10 phút đi bộ, KTX Đại học Đà Nẵng là sự lựa chọn lý tưởng cho sinh viên muốn tiết kiệm thời gian và chi phí đi lại. Khu vực xung quanh có nhiều dịch vụ tiện ích như cửa hàng tiện lợi, quán ăn, tiệm giặt là và các dịch vụ phục vụ sinh viên khác.",
  images: [
    "/images/dorm1-1.jpg",
    "/images/dorm1-2.jpg",
    "/images/dorm1-3.jpg",
    "/images/dorm1-4.jpg",
    "/images/dorm1-5.jpg",
  ],
  priceRange: "800.000đ - 1.200.000đ/tháng",
  capacity: "4-6 người/phòng",
  amenities: [
    "Wifi tốc độ cao",
    "Điều hòa",
    "Bảo vệ 24/7",
    "Căng tin",
    "Phòng giặt",
    "Bãi xe",
    "Phòng sinh hoạt chung",
    "Phòng tự học",
    "Sân thể thao",
    "Máy ATM"
  ],
  rules: [
    "Không hút thuốc trong phòng",
    "Không nấu ăn trong phòng",
    "Không nuôi thú cưng",
    "Không gây ồn sau 22:00",
    "Không tự ý đưa người lạ vào KTX",
    "Tuân thủ giờ giới nghiêm: 23:00"
  ],
  rating: 4.2,
  reviewCount: 120,
  location: {
    lat: 16.075777, 
    lng: 108.149457
  },
  availableRooms: [
    {
      id: 101,
      type: "Phòng 4 người (Standard)",
      price: "800.000đ/tháng/người",
      area: "25m²",
      features: ["Quạt trần", "Tủ quần áo", "Bàn học"],
      available: 5,
      image: "/images/room1.jpg"
    },
    {
      id: 102,
      type: "Phòng 4 người (Premium)",
      price: "1.000.000đ/tháng/người",
      area: "30m²",
      features: ["Điều hòa", "Tủ quần áo", "Bàn học", "Kệ sách"],
      available: 3,
      image: "/images/room2.jpg"
    },
    {
      id: 103,
      type: "Phòng 6 người (Standard)",
      price: "600.000đ/tháng/người",
      area: "35m²",
      features: ["Quạt trần", "Tủ quần áo", "Bàn học"],
      available: 8,
      image: "/images/room3.jpg"
    },
    {
      id: 104,
      type: "Phòng 2 người (Premium)",
      price: "1.200.000đ/tháng/người",
      area: "20m²",
      features: ["Điều hòa", "Tủ quần áo", "Bàn học", "Phòng tắm riêng"],
      available: 2,
      image: "/images/room4.jpg"
    }
  ],
  reviews: [
    {
      id: 1,
      user: "Nguyễn Văn A",
      avatar: "/images/avatar1.jpg",
      rating: 5,
      date: "20/04/2023",
      comment: "Ký túc xá rất sạch sẽ và an ninh tốt. Nhân viên thân thiện và luôn sẵn sàng hỗ trợ. Tôi rất hài lòng khi ở đây suốt 2 năm qua."
    },
    {
      id: 2,
      user: "Trần Thị B",
      avatar: "/images/avatar2.jpg",
      rating: 4,
      date: "15/03/2023",
      comment: "Cơ sở vật chất tốt, vị trí thuận tiện cho việc đi học. Tuy nhiên, đôi khi wifi hơi chậm vào giờ cao điểm."
    },
    {
      id: 3,
      user: "Lê Văn C",
      avatar: "/images/avatar3.jpg",
      rating: 3,
      date: "10/02/2023",
      comment: "Phòng ở sạch sẽ, nhưng hơi ồn vào cuối tuần. Giá cả phải chăng so với các KTX khác trong khu vực."
    },
    {
      id: 4,
      user: "Phạm Thị D",
      avatar: "/images/avatar4.jpg",
      rating: 5,
      date: "05/01/2023",
      comment: "Tuyệt vời! Ký túc xá có nhiều hoạt động cho sinh viên, giúp tôi kết bạn dễ dàng. Không gian sinh hoạt chung rộng rãi và tiện nghi."
    }
  ],
  faqs: [
    {
      question: "Làm thế nào để đăng ký phòng?",
      answer: "Bạn có thể đăng ký phòng trực tuyến thông qua website này hoặc liên hệ trực tiếp với văn phòng KTX qua số điện thoại 0236 123 4567. Sau khi đăng ký, bạn sẽ nhận được email xác nhận và hướng dẫn thanh toán."
    },
    {
      question: "KTX có giờ giới nghiêm không?",
      answer: "Có, KTX có giờ giới nghiêm là 23:00. Sau giờ này, sinh viên vẫn có thể vào KTX nhưng cần đăng ký trước với bảo vệ và có lý do chính đáng."
    },
    {
      question: "Có được nấu ăn trong phòng không?",
      answer: "Không, vì lý do an toàn phòng cháy chữa cháy, sinh viên không được phép nấu ăn trong phòng. Tuy nhiên, KTX có khu vực bếp chung ở mỗi tầng dành cho sinh viên."
    }
  ]
};

export default function DormitoryDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'info' | 'rooms' | 'reviews' | 'faqs'>('info');
  const [activeImage, setActiveImage] = useState(0);

  // Hàm khởi tạo bản đồ
  useEffect(() => {
    // Import leaflet chỉ ở phía client
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        
        // Tạo CSS cho Leaflet
        if (!document.querySelector('link[href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Đảm bảo phần tử bản đồ đã tồn tại trong DOM
        setTimeout(() => {
          const mapElement = document.getElementById('dormitory-map');
          if (mapElement && !mapElement.innerHTML) {
            // Tọa độ ký túc xá
            const location: [number, number] = [dormitory.location.lat, dormitory.location.lng];
            
            // Khởi tạo bản đồ
            const map = L.map('dormitory-map').setView(location, 15);
            
            // Thêm layer OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Thêm marker cho ký túc xá
            const marker = L.marker(location).addTo(map);
            
            // Popup thông tin
            marker.bindPopup(`
              <div style="min-width: 220px; padding: 5px;">
                <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${dormitory.name}</h3>
                <p style="font-size: 14px; margin-bottom: 5px;">${dormitory.address}</p>
                <p style="font-size: 14px; font-weight: 500;">${dormitory.priceRange}</p>
              </div>
            `).openPopup();
          }
        }, 500);
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    loadMap();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner 
        title={dormitory.name}
        subtitle={dormitory.address}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Ký túc xá', href: '/dormitories' },
          { label: dormitory.name }
        ]}
        height="large"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-gray-700 hover:text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href="/dormitories" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Danh sách KTX
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2 font-medium">{dormitory.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Dormitory Title */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{dormitory.name}</h1>
            <p className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {dormitory.address}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="ml-1 font-bold">{dormitory.rating}</span>
              <span className="ml-1 text-gray-600">({dormitory.reviewCount} đánh giá)</span>
            </div>
            <button className="flex items-center text-blue-600 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Chia sẻ
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96 md:h-[500px]">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">Hình ảnh {activeImage + 1}</span>
            </div>
            {/* Image Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setActiveImage((prev) => (prev === 0 ? dormitory.images.length - 1 : prev - 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => setActiveImage((prev) => (prev === dormitory.images.length - 1 ? 0 : prev + 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Thumbnail Navigation */}
          <div className="flex p-4 space-x-4 overflow-x-auto">
            {dormitory.images.map((image, idx) => (
              <div 
                key={idx} 
                className={`h-20 w-28 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setActiveImage(idx)}
              >
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">Thumbnail {idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="ml-3 text-lg font-bold text-gray-800">Giá phòng</h3>
            </div>
            <p className="text-xl font-bold text-blue-600">{dormitory.priceRange}</p>
            <p className="text-gray-600 mt-2">Phụ thuộc vào loại phòng và tiện ích đi kèm</p>
            <button className="mt-4 text-blue-600 hover:underline flex items-center text-sm font-medium">
              Xem bảng giá chi tiết
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="ml-3 text-lg font-bold text-gray-800">Sức chứa</h3>
            </div>
            <p className="text-xl font-bold text-gray-800">{dormitory.capacity}</p>
            <p className="text-gray-600 mt-2">Có nhiều loại phòng để lựa chọn</p>
            <p className="text-sm text-green-600 font-medium mt-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Còn phòng trống
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="ml-3 text-lg font-bold text-gray-800">Đặt phòng</h3>
            </div>
            <p className="text-gray-600">Đặt phòng ngay để được giá ưu đãi và đảm bảo còn chỗ</p>
            <Link href={`/booking/verify?dormId=${dormitory.id}`} className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Đặt phòng ngay
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Thông tin
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rooms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('rooms')}
            >
              Phòng trống
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div>
              {/* Description */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Mô tả</h2>
                <div className="px-8 pb-8">
                  <p className="text-gray-700 whitespace-pre-line">{dormitory.description}</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Tiện ích</h2>
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dormitory.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Vị trí</h2>
                <div id="dormitory-map" className="w-full h-[500px]"></div>
                <div className="p-8 pt-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">Địa chỉ:</span> <span className="ml-2">{dormitory.address}</span>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Nội quy</h2>
                <div className="px-8 pb-8">
                  <ul className="space-y-3">
                    {dormitory.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Phòng trống</h2>
                <div className="px-8 pb-8">
                  <div className="space-y-6">
                    {dormitory.availableRooms.map((room) => (
                      <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-56">
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-600">Hình ảnh phòng {room.type}</span>
                            </div>
                          </div>
                          <div className="md:w-2/3 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{room.type}</h3>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {room.available} phòng trống
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              Diện tích: {room.area}
                            </div>
                            <p className="text-gray-700 mb-4">Tiện ích: {room.features.join(", ")}</p>
                            <div className="flex justify-between items-center">
                              <div className="text-lg font-bold text-gray-800">{room.price}/tháng</div>
                              <div className="flex space-x-2">
                                <Link href={`/dormitories/${dormitory.id}/rooms/${room.id}`} className="text-blue-600 hover:underline">
                                  Chi tiết
                                </Link>
                                <Link href="/payment" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                  Đặt phòng
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Đánh giá từ người dùng</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Viết đánh giá
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-8">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-gray-900 text-center">{dormitory.rating}</div>
                      <div className="flex text-yellow-400 justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < Math.floor(dormitory.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 text-center mt-1">{dormitory.reviewCount} đánh giá</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const percentage = Math.round(
                            (dormitory.reviews.filter(review => review.rating === star).length / dormitory.reviews.length) * 100
                          );
                          return (
                            <div key={star} className="flex items-center">
                              <span className="text-sm text-gray-600 w-8">{star} sao</span>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                                <div 
                                  className="bg-yellow-400 h-2.5 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-10">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {dormitory.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                            <div>
                              <h4 className="font-bold text-gray-900">{review.user}</h4>
                              <p className="text-gray-600 text-sm">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button className="text-blue-600 hover:underline font-medium">
                      Xem tất cả đánh giá
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Câu hỏi thường gặp</h2>
                <div className="px-8 pb-8">
                  <div className="space-y-6">
                    {dormitory.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Bạn có câu hỏi khác?</h3>
                    <p className="text-gray-700 mb-4">Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, vui lòng liên hệ với chúng tôi.</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Gửi email cho chúng tôi
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Gọi điện thoại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar Dormitories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ký túc xá tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Similar Dormitory 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 1</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Đại học Bách Khoa</h3>
                <p className="text-gray-600 text-sm mb-2">54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">4.5</span>
                  <span className="ml-1 text-gray-600 text-xs">(87)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">700.000đ - 1.5tr/tháng</p>
                  <Link href="/dormitories/2" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Similar Dormitory 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 2</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Ngoại Ngữ</h3>
                <p className="text-gray-600 text-sm mb-2">131 Lương Nhữ Hộc, Khuê Trung, Cẩm Lệ, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">3.8</span>
                  <span className="ml-1 text-gray-600 text-xs">(62)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">600.000đ - 900.000đ/tháng</p>
                  <Link href="/dormitories/3" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Similar Dormitory 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 3</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Kinh tế</h3>
                <p className="text-gray-600 text-sm mb-2">71 Ngũ Hành Sơn, Mỹ An, Ngũ Hành Sơn, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">4.0</span>
                  <span className="ml-1 text-gray-600 text-xs">(95)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">900.000đ - 1.4tr/tháng</p>
                  <Link href="/dormitories/4" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bạn quan tâm đến KTX này?</h2>
              <p className="text-blue-100 mb-6">Đặt phòng ngay hôm nay để được giá ưu đãi và đảm bảo còn phòng trống cho học kỳ tới.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                  Đặt phòng ngay
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Liên hệ để tư vấn
                </button>
              </div>
            </div>
            <div className="md:w-1/3 h-40 md:h-auto">
              <div className="w-full h-full bg-blue-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DormSpace</h3>
              <p className="text-gray-400">Nền tảng đặt phòng ký túc xá hàng đầu tại Đà Nẵng, giúp sinh viên tìm kiếm và đặt phòng ký túc xá một cách nhanh chóng và thuận tiện.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Trang chủ</Link></li>
                <li><Link href="/dormitories" className="text-gray-400 hover:text-white">Danh sách ký túc xá</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">Giới thiệu</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@dormspace.vn</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>0236 123 4567</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 DormSpace. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 