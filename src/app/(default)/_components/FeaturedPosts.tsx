import PostCard, { PostCardProps } from "./PostCard";
import Link from "next/link";

interface FeaturedPostsProps {
    posts: PostCardProps[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Bài viết nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
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