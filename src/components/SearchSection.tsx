'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchSection() {
    const router = useRouter();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');

    const handleSearch = () => {
        // Xây dựng URL query params
        const params = new URLSearchParams();
        
        if (selectedRegion) {
            params.append('address', selectedRegion);
        }
        
        if (selectedPrice) {
            params.append('minPrice', selectedPrice);
        }
        
        if (selectedRoomType) {
            params.append('capacity', selectedRoomType);
        }
        
        const queryString = params.toString();
        router.push(`/dormitories${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <>
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-20 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tìm ký túc xá phù hợp</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Khu vực</label>
                <select onChange={(e) => setSelectedRegion(e.target.value)} className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả khu vực</option>
                  <option value="Hải Châu">Hải Châu</option>
                  <option value="Thanh Khê">Thanh Khê</option>
                  <option value="Liên Chiểu">Liên Chiểu</option>
                  <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
                  <option value="Sơn Trà">Sơn Trà</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Mức giá</label>
                <select onChange={(e) => setSelectedPrice(e.target.value)} className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả mức giá</option>
                  <option value="500000">Dưới 500.000đ</option>
                  <option value="800000">500.000đ - 800.000đ</option>
                  <option value="1200000">800.000đ - 1.200.000đ</option>
                  <option value="1500000">1.200.000đ - 1.500.000đ</option>
                  <option value="2000000">Trên 1.500.000đ</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Loại phòng</label>
                <select onChange={(e) => setSelectedRoomType(e.target.value)} className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Tất cả loại phòng</option>
                  <option value="2">Phòng 2 người</option>
                  <option value="4">Phòng 4 người</option>
                  <option value="6">Phòng 6 người</option>
                  <option value="8">Phòng 8 người</option>
                </select>
              </div>
              <div className="md:self-end">
                <button onClick={handleSearch} className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}