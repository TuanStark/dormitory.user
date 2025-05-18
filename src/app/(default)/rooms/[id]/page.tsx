'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Room, Building } from '@/lib/type';
import PageBanner from '@/components/PageBanner';
import formatCurrency from '@/lib/common/currentcy';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumbs';
import TabDormitory from '../../dormitories/[id]/_components/TabDormitory';
import CardRoom from '@/components/CardRoom';

interface RoomWithBuilding extends Room {
  building: Building;
}

export default function RoomDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [room, setRoom] = useState<RoomWithBuilding | null>(null);
  const [similarRooms, setSimilarRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Fetch room details
    fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/room/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setRoom(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching room:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Fetch similar rooms
    if (room?.building?.id) {
      fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/room/building/${room.building.id}?limit=4`)
        .then(res => res.json())
        .then(data => {
          // Filter out the current room
          if (data.data?.data) {
            const filteredRooms = data.data.data.filter((room: Room) => String(room.id) !== id);
            setSimilarRooms(filteredRooms.slice(0, 3)); // Limit to 3 similar rooms
          }
        })
        .catch(error => {
          console.error('Error fetching similar rooms:', error);
        });
    }
  }, [id, room?.building?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner
        title={`Phòng ${room.roomNumber}`}
        subtitle={room.building?.name}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Ký túc xá', href: '/dormitories' },
          { label: room.building?.name, href: `/dormitories/${room.building?.id || id}` },
          { label: `Phòng ${room.roomNumber}` }
        ]}
        height="medium"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <Breadcrumb name={`Phòng ${room.roomNumber}`} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96 md:h-[500px]">
                <div className="relative w-full h-full bg-gray-300 overflow-hidden group">
                  {room.images?.[activeImage] ? (
                    <img
                      src={room.images[activeImage].url}
                      alt={room.images[activeImage].description || `Ảnh ${activeImage + 1}`}
                      className='h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-125 will-change-transform transform-gpu'
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                {/* Image Navigation Arrows */}
                {room.images?.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      onClick={() => setActiveImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      onClick={() => setActiveImage((prev) => (prev === room.images.length - 1 ? 0 : prev + 1))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnail Navigation */}
              {room.images?.length > 0 && (
                <div className="flex p-4 space-x-4 overflow-x-auto">
                  {room.images.map((image: any, idx: any) => (
                    <div
                      key={idx}
                      className={`h-20 w-28 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === idx ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img
                        src={image.url}
                        alt={image.description || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Room Details Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8">
              <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Chi tiết phòng</h2>
              <div className="px-8 pb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Số phòng</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{room.roomNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Diện tích</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{room.area || 100} m²</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Sức chứa</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{room.capacity} người</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Trạng thái</h3>
                    <p className="mt-1 text-lg font-semibold text-green-600">Còn phòng</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiện nghi</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities?.map((amenity: any, idx: any) => (
                      <div key={idx} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{amenity.amenityName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mô tả</h3>
                  <p className="text-gray-700">
                    Phòng {room.roomNumber} là phòng {room.capacity} người với đầy đủ tiện nghi cần thiết cho sinh viên.
                    Phòng được trang bị đầy đủ giường, bàn học cá nhân, tủ quần áo có khóa riêng và điều hòa.
                    Phòng có diện tích {room.area}m², rộng rãi, thoáng mát và đầy đủ ánh sáng tự nhiên.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quy định phòng</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Giờ mở cửa: 6:00 - 23:00
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Không hút thuốc trong phòng
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Không nấu ăn trong phòng
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Tiết kiệm điện nước
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin đặt phòng</h2>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Giá phòng</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(room.price)}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Giá phòng/tháng</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Đặt cọc</span>
                    <span className="text-gray-900">{formatCurrency(room.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tiền điện</span>
                    <span className="text-gray-900">Tính theo số điện sử dụng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tiền nước</span>
                    <span className="text-gray-900">Tính theo số nước sử dụng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Internet</span>
                    <span className="text-gray-900">Miễn phí</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Ký túc xá</h3>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 mr-3 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{room.building?.name}</p>
                      <p className="text-sm text-gray-500">{room.building?.address}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/booking/verify?dormId=${room.building?.id}&roomId=${id}`} className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition flex justify-center items-center">
                  Đặt phòng ngay
                </Link>

                <div className="mt-4 text-center">
                  <Link href={`/dormitories/${room.building?.id || id}`} className="text-blue-600 hover:underline text-sm">
                    Xem thêm các phòng khác
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <TabDormitory dormitory={room.building} rooms={[room]}/>

        {/* Similar Rooms Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Phòng tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarRooms.map(similarRoom => (
              <CardRoom 
                key={similarRoom.id} 
                room={{
                  ...similarRoom,
                  building: {
                    id: room.building.id,
                    name: room.building.name
                  }
                }} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 