'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatCurrency from '@/lib/common/currentcy';

// Interface cho props của component
interface RoomImage {
  id: number;
  url: string;
  description?: string;
}

interface Amenity {
  id: number;
  amenityName: string;
  description?: string;
}

interface Room {
  id: string;
  roomNumber: string;
  capacity: number;
  price: number;
  area?: number;
  status: string;
  amenities: Amenity[];
  images: RoomImage[];
  building?: {
    id: string;
    name: string;
  };
}

interface CardRoomProps {
  room: Room;
  className?: string;
}

const CardRoom: React.FC<CardRoomProps> = ({ room, className = '' }) => {
  // Xử lý hình ảnh mặc định nếu không có
  const thumbnailUrl = room.images && room.images.length > 0
    ? room.images[0].url
    : 'https://via.placeholder.com/300x200?text=Không+có+ảnh';

  // Trạng thái phòng
  const statusColor = room.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const statusText = room.status === 'available' ? 'Còn phòng' : 'Hết phòng';

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {/* Hình ảnh phòng */}
      <div className="relative h-48 overflow-hidden">
        <Link href={`/rooms/${room.id}`}>
          <div className="w-full h-full transition-transform duration-500 hover:scale-110">
            <Image
              src={thumbnailUrl}
              alt={`Phòng ${room.roomNumber}`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        {/* Badge trạng thái */}
        <div className={`absolute top-3 right-3 ${statusColor} px-2 py-1 rounded-full text-xs font-medium`}>
          {statusText}
        </div>
      </div>

      {/* Thông tin phòng */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/rooms/${room.id}`} className="hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900">Phòng {room.roomNumber}</h3>
          </Link>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(room.price)}<span className="text-sm font-normal text-gray-500">/tháng</span></span>
        </div>

        {/* Tên ký túc xá */}
        {room.building && (
          <Link href={`/dormitories/${room.building.id}`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            {room.building.name}
          </Link>
        )}

        {/* Thông tin cơ bản */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center text-sm text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {room.capacity} người
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            {room.area || '100'} m²
          </div>
        </div>

        {/* Tiện nghi nổi bật */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity.id} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {amenity.amenityName}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Nút hành động */}
        <div className="mt-4 flex justify-end items-center gap-3">
          <Link 
            href={`/rooms/${room.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline rounded border border-blue-600 px-3 py-1"
          >
            Xem chi tiết
          </Link>
          <Link 
            href={`/booking/verify?dormId=${room.building?.id || ''}&roomId=${room.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition"
          >
            Đặt ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardRoom; 