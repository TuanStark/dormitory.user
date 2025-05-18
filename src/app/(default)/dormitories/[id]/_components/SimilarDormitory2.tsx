'use client';

import { useState } from 'react';
import DormitoryCard from '@/app/(default)/_components/DormitoryCard';
import useSWR from 'swr';
import { Building, Dormitory, Room } from '@/lib/type';


const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch rooms');
  }
  const data = await res.json();
  return data;
};


export default function SimilarDormitory2() {
  const [loading, setLoading] = useState(true);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/building?limit=3`;
  console.log("apiUrl", apiUrl);
  
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
  let dormitories: Building[] = [];
  if (data?.data?.data) {
    dormitories = data.data.data;
  }

  if(dormitories.length > 0){
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ký túc xá tương tự</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dormitories.map((dormitory: Dormitory) => (
            <DormitoryCard key={dormitory.id}
              dormitory={dormitory}
            />
          ))}
        </div>
      </div>
    );  
  }
}