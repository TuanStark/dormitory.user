'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Room, Building, Amenity } from '@/lib/type';
import formatCurrency  from '@/lib/common/currentcy';
interface RoomSummaryProps {
  roomId: string;
}

export default function RoomSummary({ roomId }: RoomSummaryProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);
  
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        
        // Fetch room data
        const roomResponse = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/room/${roomId}`);
        if (!roomResponse.ok) {
          throw new Error('Không thể tải thông tin phòng');
        }
        
        const roomData = await roomResponse.json();
        setRoom(roomData.data);
        
        // Fetch building data using building ID from room data
        if (roomData.data?.buildingId) {
          const buildingResponse = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/building/${roomData.data.buildingId}`);
          if (!buildingResponse.ok) {
            throw new Error('Không thể tải thông tin ký túc xá');
          }
          
          const buildingData = await buildingResponse.json();
          setBuilding(buildingData.data);
        }
        
      } catch (err) {
        console.error('Error fetching room data:', err);
        setError(err instanceof Error ? err.message : 'Không thể tải thông tin phòng');
      } finally {
        setLoading(false);
      }
    };
    
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);
  
  if (loading) {
    return (
      <div className="w-full lg:w-5/12 bg-gray-50 p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !room || !building) {
    return (
      <div className="w-full lg:w-5/12 bg-gray-50 p-6 rounded-lg">
        <div className="text-red-500">
          {error || 'Không thể tải thông tin phòng'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-5/12">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Thông tin phòng</h3>
        
        {room.images && room.images.length > 0 && (
          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
            <Image 
              src={room.images[0].url} 
              alt={`Phòng ${room.roomNumber}`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        )}
        
        <h4 className="text-lg font-semibold text-gray-800">{building.name}Phòng {room.roomNumber}</h4>
        <p className="text-gray-500 mb-4">{building.address}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Loại phòng:</span>
            <span className="font-medium text-gray-800">{room.status === 'available' ? 'Trống' : 'Đã đặt'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sức chứa:</span>
            <span className="font-medium text-gray-800">{room.capacity} người</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Diện tích:</span>
            <span className="font-medium text-gray-800">{room.area || 100} m²</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Giá phòng:</span>
            <span className="font-medium text-blue-600">{formatCurrency(room.price)} / tháng</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold mb-2 text-gray-800">Tiện nghi:</h4>
          <ul className="list-disc list-inside space-y-1">
            {room.amenities && room.amenities.map((amenity: Amenity, index: number) => (
              <li key={index} className="text-gray-600">{amenity.amenityName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 