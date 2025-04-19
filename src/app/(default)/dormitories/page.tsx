"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import PageBanner from '@/components/PageBanner';

// Dữ liệu mẫu về các ký túc xá
const dormitories = [
  {
    id: 1,
    name: "KTX Đại học Đà Nẵng",
    address: "Số 1 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
    description: "Ký túc xá hiện đại với đầy đủ tiện nghi, an ninh 24/7 và gần các cơ sở giáo dục.",
    image: "/images/dorm1.jpg",
    priceRange: "800.000đ - 1.200.000đ/tháng",
    capacity: "4-6 người/phòng",
    amenities: ["Wifi", "Điều hòa", "Bảo vệ 24/7", "Căng tin", "Phòng giặt", "Bãi xe"],
    rating: 4.2,
    reviewCount: 120,
    location: {
      lat: 16.075777, 
      lng: 108.149457
    }
  },
  {
    id: 2,
    name: "KTX Đại học Bách Khoa",
    address: "54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
    description: "Ký túc xá mới xây dựng với thiết kế hiện đại, dịch vụ tiện ích đầy đủ cho sinh viên.",
    image: "/images/dorm2.jpg",
    priceRange: "700.000đ - 1.500.000đ/tháng",
    capacity: "2-4 người/phòng",
    amenities: ["Wifi", "Điều hòa", "Bảo vệ 24/7", "Căng tin", "Phòng học nhóm", "Sân thể thao"],
    rating: 4.5,
    reviewCount: 87,
    location: {
      lat: 16.073881, 
      lng: 108.149948
    }
  },
  {
    id: 3,
    name: "KTX Ngoại Ngữ",
    address: "131 Lương Nhữ Hộc, Khuê Trung, Cẩm Lệ, Đà Nẵng",
    description: "Ký túc xá dành cho sinh viên ngoại ngữ, môi trường quốc tế và thân thiện.",
    image: "/images/dorm3.jpg",
    priceRange: "600.000đ - 900.000đ/tháng",
    capacity: "6-8 người/phòng",
    amenities: ["Wifi", "Quạt", "Bảo vệ", "Căng tin", "Phòng sinh hoạt chung"],
    rating: 3.8,
    reviewCount: 62,
    location: {
      lat: 16.036384, 
      lng: 108.201605
    }
  },
  {
    id: 4,
    name: "KTX Kinh tế",
    address: "71 Ngũ Hành Sơn, Mỹ An, Ngũ Hành Sơn, Đà Nẵng",
    description: "Ký túc xá gần biển, không gian thoáng mát và đầy đủ tiện nghi cho sinh viên.",
    image: "/images/dorm4.jpg",
    priceRange: "900.000đ - 1.400.000đ/tháng",
    capacity: "4 người/phòng",
    amenities: ["Wifi", "Điều hòa", "Bảo vệ 24/7", "Nhà ăn", "Phòng giặt", "Khu vui chơi"],
    rating: 4.0,
    reviewCount: 95,
    location: {
      lat: 16.048121, 
      lng: 108.242479
    }
  },
  {
    id: 5,
    name: "KTX Sư phạm",
    address: "459 Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng",
    description: "Ký túc xá yên tĩnh, phù hợp cho việc học tập và nghiên cứu.",
    image: "/images/dorm5.jpg",
    priceRange: "500.000đ - 800.000đ/tháng",
    capacity: "6-8 người/phòng",
    amenities: ["Wifi", "Quạt", "Bảo vệ", "Tủ đồ cá nhân", "Bãi xe"],
    rating: 3.7,
    reviewCount: 56,
    location: {
      lat: 16.064883, 
      lng: 108.153952
    }
  },
  {
    id: 6,
    name: "KTX Công nghệ thông tin",
    address: "42 Duy Tân, Hải Châu, Đà Nẵng",
    description: "Ký túc xá hiện đại với không gian làm việc chung, phòng máy tính và khu vực nghỉ ngơi.",
    image: "/images/dorm6.jpg",
    priceRange: "1.200.000đ - 1.800.000đ/tháng",
    capacity: "2-4 người/phòng",
    amenities: ["Wifi tốc độ cao", "Điều hòa", "Bảo vệ 24/7", "Phòng máy tính", "Phòng giặt", "Khu vực BBQ"],
    rating: 4.7,
    reviewCount: 132,
    location: {
      lat: 16.046440, 
      lng: 108.223301
    }
  }
];

export default function DormitoriesPage() {
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
          const mapElement = document.getElementById('map');
          if (mapElement && !mapElement.innerHTML) {
            // Tọa độ trung tâm Đà Nẵng
            const danang: [number, number] = [16.047079, 108.206230];
            
            // Khởi tạo bản đồ
            const map = L.map('map').setView(danang, 13);
            
            // Thêm layer OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Thêm marker cho mỗi ký túc xá
            dormitories.forEach(dorm => {
              const marker = L.marker([dorm.location.lat, dorm.location.lng] as [number, number]).addTo(map);
              
              // Popup thông tin
              marker.bindPopup(`
                <div style="min-width: 220px; padding: 5px;">
                  <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${dorm.name}</h3>
                  <p style="font-size: 14px; margin-bottom: 5px;">${dorm.address}</p>
                  <p style="font-size: 14px; font-weight: 500; margin-bottom: 10px;">${dorm.priceRange}</p>
                  <a href="/dormitories/${dorm.id}" style="color: #2563eb; font-size: 14px; font-weight: 500; display: inline-block;">
                    Xem chi tiết
                  </a>
                </div>
              `);
            });
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
        title="Ký túc xá tại Đà Nẵng"
        subtitle="Khám phá các ký túc xá chất lượng cao với đầy đủ tiện nghi dành cho sinh viên"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Ký túc xá' }
        ]}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Map Section - Now above the filters and results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bản đồ ký túc xá tại Đà Nẵng</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div id="map" className="h-[500px] w-full rounded-lg"></div>
            <p className="text-gray-600 italic text-sm mt-4">
              * Bấm vào điểm đánh dấu trên bản đồ để xem thông tin ký túc xá.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Filters */}
          <div className="lg:w-1/3 w-full sticky top-4">
            {/* Search & Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tìm kiếm & Lọc</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tìm kiếm</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tên KTX, địa chỉ..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Khu vực</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                  <option>Tất cả khu vực</option>
                  <option>Hải Châu</option>
                  <option>Thanh Khê</option>
                  <option>Liên Chiểu</option>
                  <option>Ngũ Hành Sơn</option>
                  <option>Sơn Trà</option>
                  <option>Cẩm Lệ</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mức giá</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                  <option>Tất cả mức giá</option>
                  <option>Dưới 500.000đ</option>
                  <option>500.000đ - 800.000đ</option>
                  <option>800.000đ - 1.200.000đ</option>
                  <option>1.200.000đ - 1.500.000đ</option>
                  <option>Trên 1.500.000đ</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Loại phòng</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                  <option>Tất cả loại phòng</option>
                  <option>Phòng 2 người</option>
                  <option>Phòng 4 người</option>
                  <option>Phòng 6 người</option>
                  <option>Phòng 8 người</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tiện ích</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="wifi" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="wifi" className="ml-2 text-gray-700">Wifi</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="ac" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="ac" className="ml-2 text-gray-700">Điều hòa</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="security" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="security" className="ml-2 text-gray-700">Bảo vệ 24/7</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="canteen" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="canteen" className="ml-2 text-gray-700">Căng tin</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="laundry" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="laundry" className="ml-2 text-gray-700">Phòng giặt</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="parking" className="h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor="parking" className="ml-2 text-gray-700">Bãi xe</label>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                Áp dụng bộ lọc
              </button>
            </div>
          </div>
          
          {/* Right Column: Results */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <label className="mr-2 text-gray-700">Sắp xếp:</label>
                  <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500">
                    <option>Mặc định</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Mới nhất</option>
                  </select>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">Hiển thị {dormitories.length} kết quả</p>
              
              {/* Dormitory List */}
              <div className="space-y-6">
                {dormitories.map((dorm) => (
                  <div key={dorm.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative h-60">
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600">Hình ảnh {dorm.name}</span>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-bold text-gray-800">{dorm.name}</h2>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="ml-1 font-medium">{dorm.rating}</span>
                            <span className="ml-1 text-gray-600">({dorm.reviewCount})</span>
                          </div>
                        </div>
                        <p className="flex items-center text-gray-600 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {dorm.address}
                        </p>
                        <p className="text-gray-700 mb-4">{dorm.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dorm.amenities.slice(0, 5).map((amenity, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {dorm.amenities.length > 5 && (
                            <span className="text-gray-500 text-xs font-medium">
                              +{dorm.amenities.length - 5} khác
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-600">Sức chứa: <span className="font-medium">{dorm.capacity}</span></p>
                            <div className="text-lg font-bold text-gray-800">{dorm.priceRange}</div>
                          </div>
                          <div className="flex space-x-2 justify-center items-center">
                            <Link href={`/dormitories/${dorm.id}`} className="text-blue-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                              Chi tiết
                            </Link>
                            <Link href={`/booking/verify?dormId=${dorm.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                              Đặt phòng
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    &laquo;
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md bg-blue-600 text-white">
                    1
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </a>
                  <span className="px-3 py-2 text-gray-500">...</span>
                  <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    8
                  </a>
                  <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    &raquo;
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 