'use client';

import useSWR from 'swr';
import { useCallback } from 'react';

// Định nghĩa kiểu dữ liệu cho Post
export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  postedAt: string;
  status: string;
  userId: number;
}

// Định nghĩa kiểu dữ liệu cho response từ API
interface ApiResponse {
  status: number;
  message: string;
  data: {
    items: Post[];
    total?: number;
  };
}

// Định nghĩa kiểu dữ liệu trả về từ hook
interface PostResponse {
  data: Post[];
  status: string;
  message: string;
}

interface UseFetchPostsResult {
  data?: PostResponse;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => void;
}

// Hàm fetcher cho SWR
const fetcher = async (url: string): Promise<PostResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const responseData = await res.json() as ApiResponse;

  if (responseData.status === 200) {
    return {
      data: responseData.data.items || [],
      status: 'success',
      message: responseData.message || 'Success',
    };
  }
  throw new Error(responseData.message || 'Failed to fetch posts');
};

// Hook để fetch posts với SWR
export function useFetchPosts(limit?: number, initialData?: PostResponse): UseFetchPostsResult {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/post${limit ? `?limit=${limit}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<PostResponse, Error>(url, fetcher, {
    fallbackData: initialData, // Dữ liệu ban đầu từ Server Component (nếu có)
    revalidateOnFocus: false, // Không refetch khi focus lại tab
    revalidateOnReconnect: true, // Refetch khi reconnect mạng
    dedupingInterval: 60000, // Cache 60 giây để tránh gọi API trùng lặp
    refreshInterval: 86400000, // Refetch mỗi 24 giờ, tương tự ISR
  });

  // Hàm refresh để làm mới dữ liệu
  const refreshData = useCallback(() => {
    mutate(); // Gọi lại fetcher để refetch dữ liệu
  }, [mutate]);

  return {
    data: data || initialData, // Sử dụng initialData nếu data chưa có
    isLoading,
    error: error || null,
    refreshData,
  };
}