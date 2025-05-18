"use client";

import PostCard from "./PostCard";
import Link from "next/link";
import useSwr from "swr";
import { Post } from "@/lib/api/post";

export default function FeaturedPosts() {
  const fetcher = (url: string) => fetch(url)
  .then((res) => res.json());

  const { data, isLoading, error } = useSwr(
    `${process.env.NEXT_PUBLIC_API_URL}/post?limit=3`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      refreshInterval: 5000,
    }
  );
  // console.log('data', data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Bài viết nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.data?.items?.map((post : Post) => (
            <PostCard
              key={post.id}
              date={post.postedAt}
              title={post.title}
              description={post.description}
              link={`/blog/${post.id}`}
              content={post.content}
              image={post.image}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
};