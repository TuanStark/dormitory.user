
import Link from 'next/link';

export interface PostCardProps {
  date: string;
  title: string;
  description: string;
  link: string;
}

export default function PostCard({ date, title, description, link }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-300 flex items-center justify-center">
      <span className="text-gray-600">Hình ảnh bài viết</span>
    </div>
    <div className="p-6">
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{date}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link} className="text-blue-600 font-medium hover:underline">
        Đọc thêm
      </Link>
    </div>
    </div>
  );
}