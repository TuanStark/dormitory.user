'use client';

import React from 'react';
import useSWR from 'swr';
import CardRoom from './CardRoom';
import { Room } from '@/lib/type';

interface CardRoomListProps {
  buildingId: string;
  title?: string;
  subtitle?: string;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  console.log("Fetching URL:", url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch rooms');
  }
  const data = await res.json();
  console.log("Raw API response:", data);
  return data;
};

export default function CardRoomList({
  buildingId,
  title,
  subtitle,
  loading = false,
  emptyMessage = 'Không có phòng nào',
  className = '',
}: CardRoomListProps) {

  const apiUrl = buildingId ? `http://localhost:8000/room/building/${buildingId}?limit=4` : null;
  
  const { data, error, isLoading } = useSWR(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 0,
      revalidateOnMount: true,
      onError: (err) => {
        console.error("SWR Error:", err);
      }
    }
  );

  // Xử lý dữ liệu an toàn hơn
  let rooms: Room[] = [];
  if (data?.data?.data) {
    rooms = data.data.data;
  }
  
  
  // Render skeleton khi đang loading
  if (loading || isLoading) {
    return (
      <div className={`w-full ${className}`}>
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
                <div className="mt-3 flex gap-1">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Hiển thị thông báo khi không có phòng
  if (buildingId === null) {
    return (
      <div className={`w-full ${className}`}>
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Render danh sách phòng
  return (
    <div className={`w-full ${className}`}>
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room: Room) => (
          <CardRoom key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
} 