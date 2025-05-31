'use client';

import useSWR from 'swr';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Dormitory } from '@/lib/type';
import debounce from 'lodash/debounce';
import formatCurrency from '@/lib/common/currentcy';
import { useSearchParams } from 'next/navigation';

// Hàm fetcher cho SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('Failed to fetch dormitories');
  }
  return res.json();
});

export default function ListDormitory() {
  const searchParams = useSearchParams();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Load filters from URL params when component mounts
  useEffect(() => {
    const address = searchParams.get('address');
    const minPrice = searchParams.get('minPrice');
    const capacity = searchParams.get('capacity');
    
    if (address) {
      setAreaFilter(address);
    }
    
    if (minPrice) {
      // Chuyển minPrice sang định dạng range của filter
      const priceValue = parseInt(minPrice);
      if (priceValue <= 500000) {
        setPriceFilter('0-500000');
      } else if (priceValue <= 800000) {
        setPriceFilter('500000-800000');
      } else if (priceValue <= 1200000) {
        setPriceFilter('800000-1200000');
      } else if (priceValue <= 1500000) {
        setPriceFilter('1200000-1500000');
      } else {
        setPriceFilter('1500000-999999999');
      }
    }
    
    if (capacity) {
      setRoomTypeFilter(capacity);
    }
  }, [searchParams]);

  // Debounce search term
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 500),
    []
  );

  // Update debounced search term when search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Build query parameters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
    if (areaFilter !== 'all') params.append('location', areaFilter);
    
    // Handle price range
    if (priceFilter !== 'all') {
      const [minPrice, maxPrice] = priceFilter.split('-').map(price => 
        parseInt(price.replace(/[^0-9]/g, ''))
      );
      params.append('minPrice', minPrice.toString());
      params.append('maxPrice', maxPrice.toString());
    }
    
    // Handle room type (capacity)
    if (roomTypeFilter !== 'all') {
      params.append('capacity', roomTypeFilter);
    }
    
    // Handle amenities
    if (amenitiesFilter.length > 0) {
      params.append('amenities', amenitiesFilter.join(','));
    }
    
    // Add pagination
    params.append('page', currentPage.toString());
    params.append('limit', itemsPerPage.toString());
    
    return params.toString();
  };

  // Fetch data using SWR
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/building?${buildQueryParams()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Dedupe requests within 1 minute
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Lỗi!</strong>
        <span className="block sm:inline"> Không thể tải danh sách ký túc xá. Vui lòng thử lại sau.</span>
      </div>
    );
  }

  // Process and filter data
  let dormitories: Dormitory[] = [];
  let totalPages = 1;
  
  if (data?.data?.data) {
    dormitories = data.data.data;
    totalPages = data.data.meta.totalPages;
  }

  return (
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            >
              <option value="all">Tất cả khu vực</option>
              <option value="Liên Chiểu">Liên Chiểu</option>
              <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
              <option value="Hải Châu">Hải Châu</option>
              <option value="Thanh Khê">Thanh Khê</option>
              <option value="Sơn Trà">Sơn Trà</option>
              <option value="Cẩm Lệ">Cẩm Lệ</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mức giá</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Tất cả mức giá</option>
              <option value="0-500000">Dưới 500.000đ</option>
              <option value="500000-800000">500.000đ - 800.000đ</option>
              <option value="800000-1200000">800.000đ - 1.200.000đ</option>
              <option value="1200000-1500000">1.200.000đ - 1.500.000đ</option>
              <option value="1500000-999999999">Trên 1.500.000đ</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Loại phòng</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
            >
              <option value="all">Tất cả loại phòng</option>
              <option value="2">Phòng 2 người</option>
              <option value="4">Phòng 4 người</option>
              <option value="6">Phòng 6 người</option>
              <option value="8">Phòng 8 người</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tiện ích</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'wifi', label: 'Wifi' },
                { id: 'air_conditioner', label: 'Điều hòa' },
                { id: 'security', label: 'Bảo vệ 24/7' },
                { id: 'canteen', label: 'Căng tin' },
                { id: 'laundry', label: 'Phòng giặt' },
                { id: 'parking', label: 'Bãi xe' }
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={amenity.id} 
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={amenitiesFilter.includes(amenity.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAmenitiesFilter([...amenitiesFilter, amenity.id]);
                      } else {
                        setAmenitiesFilter(amenitiesFilter.filter(a => a !== amenity.id));
                      }
                    }}
                  />
                  <label htmlFor={amenity.id} className="ml-2 text-gray-700">{amenity.label}</label>
                </div>
              ))}
            </div>
          </div>
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
                  <div className="md:w-1/3 relative">
                    <img 
                      src={dorm.image || '/default_building.jpg'} 
                      alt={dorm.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-gray-800">{dorm.name}</h2>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="ml-1 font-medium text-black">{dorm.averageRating}</span>
                        <span className="ml-1 text-gray-600">({dorm.fiveStar + dorm.fourStar + dorm.threeStar + dorm.twoStar + dorm.oneStar})</span>
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
                      {dorm.rooms[0]?.amenities?.slice(0, 5).map((amenity, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {amenity.amenityName}
                        </span>
                      ))}
                      {dorm.rooms[0]?.amenities && dorm.rooms[0].amenities.length > 5 && (
                        <span className="text-gray-500 text-xs font-medium">
                          +{dorm.rooms[0].amenities.length - 5} khác
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">Sức chứa: <span className="font-medium">{dorm.rooms[0]?.capacity || 'N/A'}</span></p>
                        <div className="text-lg font-bold text-gray-800">{dorm.rooms[0]?.price ? formatCurrency(dorm.rooms[0].price) : 'N/A'}</div>
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
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &raquo;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}