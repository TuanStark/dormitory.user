'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PageBanner from '@/components/PageBanner';

// Sample news data (same as on the news listing page)
const newsData = [
  {
    id: 1,
    title: 'KTX Đại học Đà Nẵng mở thêm 500 chỗ ở mới cho sinh viên',
    category: 'Tin tức KTX',
    date: '15/07/2023',
    image: '/images/news1.jpg',
    author: 'Nguyễn Văn A',
    content: `<p>Ký túc xá Đại học Đà Nẵng vừa hoàn thành việc nâng cấp và mở rộng khu nhà C với 500 chỗ ở mới dành cho sinh viên năm học 2023-2024.</p>
    
    <p>Theo thông tin từ Ban Quản lý Ký túc xá, dự án nâng cấp này đã được triển khai từ tháng 3/2023 và hoàn thành vào cuối tháng 6/2023, kịp thời đưa vào sử dụng cho năm học mới.</p>
    
    <p>Ông Trần Văn B, Trưởng Ban Quản lý KTX Đại học Đà Nẵng cho biết: "Việc mở rộng thêm 500 chỗ ở mới góp phần đáp ứng nhu cầu chỗ ở ngày càng tăng của sinh viên, đặc biệt là sinh viên năm nhất và sinh viên có hoàn cảnh khó khăn."</p>
    
    <p>Các phòng ở mới được trang bị đầy đủ tiện nghi cơ bản như: giường tầng, tủ đồ cá nhân, bàn học, hệ thống điều hòa, nóng lạnh và wifi tốc độ cao. Ngoài ra, khu vực nhà C còn được bổ sung các tiện ích chung như: phòng sinh hoạt cộng đồng, khu vực giặt sấy, căng tin mini và khu vực học tập chung.</p>
    
    <p>Mức phí ở KTX tại khu nhà C mới dao động từ 400.000đ đến 600.000đ/người/tháng tùy theo loại phòng (4 người, 6 người hoặc 8 người).</p>
    
    <p>Sinh viên có nhu cầu đăng ký ở KTX có thể nộp hồ sơ trực tuyến qua cổng thông tin sinh viên hoặc nộp trực tiếp tại văn phòng Ban quản lý KTX từ ngày 20/07/2023.</p>
    
    <p>Ưu tiên xét duyệt dành cho sinh viên thuộc diện chính sách, sinh viên có hoàn cảnh khó khăn và sinh viên năm nhất.</p>`,
    tags: ['KTX Đà Nẵng', 'Chỗ ở sinh viên', 'Ký túc xá']
  },
  {
    id: 2,
    title: 'Hướng dẫn thủ tục đăng ký ở KTX cho tân sinh viên',
    category: 'Hướng dẫn',
    date: '01/08/2023',
    image: '/images/news2.jpg',
    author: 'Nguyễn Thị B',
    content: `<p>Bài viết hướng dẫn chi tiết các thủ tục, giấy tờ cần thiết và quy trình đăng ký ở ký túc xá dành cho tân sinh viên nhập học năm 2023.</p>
    
    <h3>Giấy tờ cần chuẩn bị</h3>
    <ul>
      <li>Đơn đăng ký ở KTX (theo mẫu)</li>
      <li>Bản sao giấy báo nhập học</li>
      <li>Bản sao CMND/CCCD</li>
      <li>02 ảnh 3x4 (chụp trong vòng 6 tháng)</li>
      <li>Giấy xác nhận đối tượng ưu tiên (nếu có)</li>
    </ul>
    
    <h3>Quy trình đăng ký</h3>
    <ol>
      <li>Đăng ký online qua cổng thông tin sinh viên</li>
      <li>Nhận email xác nhận và mã đăng ký</li>
      <li>Nộp bộ hồ sơ giấy tại văn phòng KTX</li>
      <li>Đóng phí KTX (theo kỳ hoặc theo năm)</li>
      <li>Nhận phòng và làm thủ tục nhập KTX</li>
    </ol>
    
    <h3>Thời gian đăng ký</h3>
    <p>Đợt 1: 01/08 - 15/08/2023 (dành cho sinh viên diện chính sách, ưu tiên)</p>
    <p>Đợt 2: 16/08 - 30/08/2023 (dành cho tất cả sinh viên)</p>
    
    <h3>Mức phí KTX</h3>
    <p>Phòng 8 người: 400.000đ/tháng</p>
    <p>Phòng 6 người: 500.000đ/tháng</p>
    <p>Phòng 4 người: 600.000đ/tháng</p>
    
    <p>Sinh viên có thể đóng phí theo kỳ (5 tháng) hoặc theo năm học (10 tháng) để được hưởng ưu đãi giảm 5-10% tổng phí.</p>
    
    <h3>Lưu ý quan trọng</h3>
    <p>- Ưu tiên xét duyệt cho sinh viên đăng ký sớm và đầy đủ giấy tờ</p>
    <p>- Sinh viên nên đăng ký sớm để có nhiều lựa chọn phòng ở hơn</p>
    <p>- Cần đóng tiền đặt cọc 500.000đ (sẽ được hoàn trả khi kết thúc hợp đồng)</p>
    <p>- Cần tuân thủ đúng thời hạn nộp hồ sơ và đóng phí</p>`,
    tags: ['Hướng dẫn KTX', 'Tân sinh viên', 'Thủ tục']
  },
];

// Related news data
const relatedNewsData = [
  {
    id: 4,
    title: 'Chính sách hỗ trợ tài chính cho sinh viên ở KTX',
    category: 'Chính sách',
    date: '20/07/2023'
  },
  {
    id: 5,
    title: 'Cải thiện chất lượng bữa ăn tại căng tin KTX',
    category: 'Tin tức KTX',
    date: '05/08/2023'
  },
  {
    id: 7,
    title: 'Kinh nghiệm sống tại KTX cho tân sinh viên',
    category: 'Chia sẻ kinh nghiệm',
    date: '02/08/2023'
  }
];

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = parseInt(params.id as string);
  
  // Find the news article by ID
  const newsArticle = newsData.find(news => news.id === newsId);
  
  // If article not found
  if (!newsArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h3>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
          </p>
          <Link href="/news" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block">
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner 
        title={newsArticle.title}
        subtitle={`${newsArticle.category} - ${newsArticle.date}`}
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tin tức', href: '/news' },
          { label: newsArticle.title }
        ]}
      />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Article Header */}
          <div className="h-72 bg-blue-50 relative">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-blue-500 font-medium">Hình ảnh bài viết</span>
            </div>
          </div>
          
          <div className="p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {newsArticle.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">{newsArticle.author}</p>
                  <p className="text-gray-500 text-sm">{newsArticle.date}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {newsArticle.category}
                </span>
              </div>
            </div>
            
            {/* Article Content */}
            <div className="prose prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: newsArticle.content }} />
            </div>
            
            {/* Article Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {newsArticle.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share Links */}
            <div className="mt-6">
              <p className="text-gray-700 font-medium mb-2">Chia sẻ bài viết:</p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Bài viết liên quan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNewsData.map((news) => (
              <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Hình ảnh tin tức</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-blue-600">{news.category}</span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-md font-bold text-gray-800 mb-3 line-clamp-2">
                    <Link href={`/news/${news.id}`} className="hover:text-blue-600 transition">
                      {news.title}
                    </Link>
                  </h3>
                  <Link href={`/news/${news.id}`} className="inline-flex items-center text-sm text-blue-600 font-medium hover:text-blue-800 transition">
                    Đọc tiếp
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/news" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang tin tức
          </Link>
        </div>
      </main>
    </div>
  )
}
 