"use client";

import useSWR from 'swr';
import PageBanner from '@/components/PageBanner';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Building, Dormitory, Room } from '@/lib/type';
import CTASection from './_components/CTASection';
import SimilarDormitory2 from './_components/SimilarDormitory2';
import BasicInfor from './_components/BasicInfo';

import TabDormitory from './_components/TabDormitory';
import Breadcrumbs from '@/components/Breadcrumbs';
import ListRoom from './_components/ListRoom';
// Hàm fetcher cho SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error('Failed to fetch dormitory');
  }
  return res.json();
});

export default function DormitoryDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Fetch data using SWR with building ID as key
  const { data, error, isLoading } = useSWR(
    params.id ? `${process.env.NEXT_PUBLIC_API_URL}/building/${params.id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 0, // Disable deduping to ensure fresh data
      refreshInterval: 0, // Disable auto refresh
      suspense: false,
      keepPreviousData: false, // Don't keep previous data when switching buildings
    }
  );

  // Reset active image when building changes
  useEffect(() => {
    setActiveImage(0);
  }, [params.id]);

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
        <span className="block sm:inline"> Không thể tải thông tin ký túc xá. Vui lòng thử lại sau.</span>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Process data with null check
  if (!data?.data?.building || !data?.data?.rooms) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Thông báo!</strong>
        <span className="block sm:inline"> Không tìm thấy thông tin ký túc xá.</span>
      </div>
    );
  }
  const dormitory: Building = data.data.building;
  const rooms: Room[] = data.data.rooms;

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
        <Breadcrumbs name={dormitory.name} />

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
              <span className="ml-1 font-bold text-gray-500">{dormitory.averageRating}</span>
              <span className="ml-1 text-gray-600">({0} đánh giá)</span>
            </div>
            <button className="flex items-center text-blue-600 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Chia sẻ
            </button>
          </div>
        </div>

        {/* Rooms Section */}
        <ListRoom rooms={rooms} dormitory={dormitory} />
        {/* Basic Info Cards */}
        <BasicInfor dormitory={dormitory} rooms={rooms} />

        <TabDormitory dormitory={dormitory} rooms={rooms} />

        {/* Similar Dormitories */}
        <SimilarDormitory2 /> 

        {/* CTA Section */}
        <CTASection/>
      </main>
    </div>
  );
} 