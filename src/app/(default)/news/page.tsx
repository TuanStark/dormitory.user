'use client';

import React, { useState } from 'react';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';

// Sample news data
const newsData = [
  {
    id: 1,
    title: 'KTX Đại học Đà Nẵng mở thêm 500 chỗ ở mới cho sinh viên',
    category: 'Tin tức KTX',
    date: '15/07/2023',
    image: '/images/news1.jpg',
    summary: 'Ký túc xá Đại học Đà Nẵng vừa hoàn thành việc nâng cấp và mở rộng khu nhà C với 500 chỗ ở mới dành cho sinh viên năm học 2023-2024.',
    featured: true
  },
  {
    id: 2,
    title: 'Hướng dẫn thủ tục đăng ký ở KTX cho tân sinh viên',
    category: 'Hướng dẫn',
    date: '01/08/2023',
    image: '/images/news2.jpg',
    summary: 'Bài viết hướng dẫn chi tiết các thủ tục, giấy tờ cần thiết và quy trình đăng ký ở ký túc xá dành cho tân sinh viên nhập học năm 2023.',
    featured: true
  },
  {
    id: 3,
    title: 'Các hoạt động ngoại khóa tại KTX trong học kỳ tới',
    category: 'Hoạt động',
    date: '10/08/2023',
    image: '/images/news3.jpg',
    summary: 'Chuỗi các hoạt động văn hóa, thể thao và kỹ năng sẽ được tổ chức tại các ký túc xá trực thuộc Đại học Đà Nẵng trong học kỳ sắp tới.',
    featured: true
  },
  {
    id: 4,
    title: 'Chính sách hỗ trợ tài chính cho sinh viên ở KTX',
    category: 'Chính sách',
    date: '20/07/2023',
    image: '/images/news4.jpg',
    summary: 'Thông tin về các chính sách hỗ trợ tài chính, miễn giảm phí KTX cho sinh viên có hoàn cảnh khó khăn trong năm học 2023-2024.',
    featured: false
  },
  {
    id: 5,
    title: 'Cải thiện chất lượng bữa ăn tại căng tin KTX',
    category: 'Tin tức KTX',
    date: '05/08/2023',
    image: '/images/news5.jpg',
    summary: 'Ban quản lý KTX Đại học Đà Nẵng vừa công bố kế hoạch cải thiện chất lượng bữa ăn tại căng tin với nhiều món ăn mới và đa dạng hơn.',
    featured: false
  },
  {
    id: 6,
    title: 'Ứng dụng đặt phòng KTX chính thức ra mắt',
    category: 'Công nghệ',
    date: '12/08/2023',
    image: '/images/news6.jpg',
    summary: 'Ứng dụng DormSpace vừa chính thức ra mắt, giúp sinh viên dễ dàng tìm kiếm và đặt phòng KTX trực tuyến chỉ với vài thao tác đơn giản.',
    featured: false
  },
  {
    id: 7,
    title: 'Kinh nghiệm sống tại KTX cho tân sinh viên',
    category: 'Chia sẻ kinh nghiệm',
    date: '02/08/2023',
    image: '/images/news7.jpg',
    summary: 'Những chia sẻ hữu ích từ các sinh viên năm trên về kinh nghiệm sống, học tập và sinh hoạt tại ký túc xá dành cho tân sinh viên.',
    featured: false
  },
  {
    id: 8,
    title: 'Tổng kết cuộc thi "KTX xanh - sạch - đẹp" năm 2023',
    category: 'Hoạt động',
    date: '30/07/2023',
    image: '/images/news8.jpg',
    summary: 'Kết quả và hình ảnh từ cuộc thi "KTX xanh - sạch - đẹp" vừa được tổ chức với sự tham gia của hơn 20 tòa nhà KTX trên địa bàn Đà Nẵng.',
    featured: false
  },
  {
    id: 9,
    title: 'Quy định mới về nội quy KTX từ năm học 2023-2024',
    category: 'Quy định',
    date: '25/07/2023',
    image: '/images/news9.jpg',
    summary: 'Thông tin về các quy định, nội quy mới áp dụng tại các KTX từ năm học 2023-2024 mà sinh viên cần biết và tuân thủ.',
    featured: false
  }
];

// Categories for filtering
const categories = [
  'Tất cả',
  'Tin tức KTX',
  'Hướng dẫn',
  'Chính sách',
  'Hoạt động',
  'Công nghệ',
  'Quy định',
  'Chia sẻ kinh nghiệm'
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter news based on category and search term
  const filteredNews = newsData.filter(news => {
    const matchesCategory = activeCategory === 'Tất cả' || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Featured articles
  const featuredNews = newsData.filter(news => news.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner 
        title="Tin tức & Bài viết"
        subtitle="Cập nhật thông tin mới nhất về ký túc xá và đời sống sinh viên"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tin tức' }
        ]}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin tức nổi bật</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="relative h-48 bg-blue-100">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-blue-500">{news.title}</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Nổi bật
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-600">{news.category}</span>
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      <Link href={`/news/${news.id}`} className="hover:text-blue-600 transition">
                        {news.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
                    <Link href={`/news/${news.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                      Đọc tiếp
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tin tức..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* All News Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tất cả tin tức</h2>
          
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">{news.title}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-600">{news.category}</span>
                      <span className="text-sm text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      <Link href={`/news/${news.id}`} className="hover:text-blue-600 transition">
                        {news.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
                    <Link href={`/news/${news.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition">
                      Đọc tiếp
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-600">
                Không có tin tức nào phù hợp với tiêu chí tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác.
              </p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredNews.length > 0 && (
            <div className="flex justify-center mt-10">
              <nav className="flex items-center space-x-2">
                <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  &laquo;
                </a>
                <a href="#" className="px-3 py-2 rounded-md bg-blue-600 text-white">
                  1
                </a>
                <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </a>
                <span className="px-3 py-2 text-gray-500">...</span>
                <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                  5
                </a>
                <a href="#" className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  &raquo;
                </a>
              </nav>
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Đăng ký nhận bản tin</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Nhận thông tin mới nhất về ký túc xá, sự kiện, hoạt động và các mẹo hữu ích cho đời sống sinh viên tại Đà Nẵng.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-grow p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 border border-blue-400 bg-blue-50 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition shadow-sm"
                >
                  Đăng ký
                </button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết không gửi email spam.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
} 