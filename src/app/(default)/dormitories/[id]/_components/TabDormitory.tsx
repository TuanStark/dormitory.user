import { useState } from 'react';
import { Dormitory, Room } from '@/lib/type';
import UniversalMap from '../../_components/UniversalMap';

interface TabDormitoryProps {
    dormitory: Dormitory;
    rooms: Room[];
}

// Dữ liệu FAQ cố định
const faqData = [
  {
    question: "Làm thế nào để đặt phòng KTX?",
    answer: "Để đặt phòng KTX, bạn có thể chọn phòng phù hợp trong danh sách phòng trống và nhấn vào nút 'Đặt phòng'. Sau đó, làm theo các hướng dẫn để hoàn tất quá trình đặt phòng."
  },
  {
    question: "Giờ giới nghiêm của KTX là mấy giờ?",
    answer: "Giờ giới nghiêm của KTX thường là 23:00. Sau thời gian này, sinh viên cần có mặt trong KTX và không được ra ngoài trừ trường hợp khẩn cấp."
  },
  {
    question: "Có được nấu ăn trong phòng KTX không?",
    answer: "Không, việc nấu ăn trong phòng KTX không được phép để đảm bảo an toàn phòng cháy chữa cháy. Các KTX thường có khu vực bếp chung dành cho sinh viên."
  },
  {
    question: "Chi phí thuê phòng KTX bao gồm những gì?",
    answer: "Chi phí thuê phòng KTX thường bao gồm tiền phòng, điện, nước, và internet. Một số dịch vụ gia tăng như giặt là, vệ sinh phòng có thể tính phí riêng."
  },
  {
    question: "Làm thế nào để báo cáo sự cố trong phòng KTX?",
    answer: "Bạn có thể báo cáo sự cố trong phòng KTX bằng cách liên hệ trực tiếp với quản lý tòa nhà, gọi điện thoại đến số hotline, hoặc sử dụng ứng dụng di động của KTX để gửi yêu cầu sửa chữa."
  },
  {
    question: "KTX có dịch vụ giặt là không?",
    answer: "Có, hầu hết các KTX đều có dịch vụ giặt là. Thông thường, sẽ có khu vực máy giặt công cộng hoặc dịch vụ giặt là theo yêu cầu với mức phí phù hợp."
  }
];

export default function TabDormitory({ dormitory, rooms }: TabDormitoryProps) {
    const [activeTab, setActiveTab] = useState('info');
    return (
        <>
            <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              data-tab="info"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab('info')}
            >
              Thông tin
            </button>
            <button
              data-tab="reviews"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab('reviews')}
            >
              Đánh giá
            </button>
            <button
              data-tab="faqs"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'faqs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div>
              {/* Description */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Mô tả</h2>
                <div className="px-8 pb-8">
                  <p className="text-gray-700 whitespace-pre-line">{dormitory.description}</p>
                </div>
              </div>
              {/* Location Map - Using UniversalMap component */}
              <UniversalMap 
                singleDormitory={dormitory} 
                title="Vị trí" 
              />

              {/* Rules */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Nội quy</h2>
                <div className="px-8 pb-8">
                  <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Không hút thuốc trong phòng</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Không nấu ăn trong phòng</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Không nuôi thú cưng</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Không gây ồn sau 22:00</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Không tự ý đưa người lạ vào KTX</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-700">Tuân thủ giờ giới nghiêm: 23:00</span>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Đánh giá từ người dùng</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Viết đánh giá
                    </button>
                  </div>

                  <div className="flex items-center mb-8">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-gray-900 text-center">{dormitory.averageRating}</div>
                      <div className="flex text-yellow-400 justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${i < Math.floor(dormitory.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 text-center mt-1">
                        {dormitory.fiveStar + dormitory.fourStar + dormitory.threeStar + dormitory.twoStar + dormitory.oneStar} đánh giá
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = star === 5 ? dormitory.fiveStar :
                                      star === 4 ? dormitory.fourStar :
                                      star === 3 ? dormitory.threeStar :
                                      star === 2 ? dormitory.twoStar :
                                      dormitory.oneStar;
                          const total = dormitory.fiveStar + dormitory.fourStar + dormitory.threeStar + dormitory.twoStar + dormitory.oneStar;
                          const percentage = Math.round((count / total) * 100);
                          return (
                            <div key={star} className="flex items-center">
                              <span className="text-sm text-gray-600 w-8">{star} sao</span>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                                <div
                                  className="bg-yellow-400 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-10">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button className="text-blue-600 hover:underline font-medium">
                      Xem tất cả đánh giá
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Tab */}
          {activeTab === 'faqs' && (
            <div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 p-8 pb-4">Câu hỏi thường gặp</h2>
                <div className="px-8 pb-8">
                  <div className="space-y-6">
                    {faqData.map((faq, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Bạn có câu hỏi khác?</h3>
                    <p className="text-gray-700 mb-4">Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, vui lòng liên hệ với chúng tôi.</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Gửi email cho chúng tôi
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Gọi điện thoại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </>
    )
}