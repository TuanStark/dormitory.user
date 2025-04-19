

export default function AdsBanner() {
    return (
        <>
        <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Tại sao chọn DormSpace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tìm kiếm dễ dàng</h3>
              <p className="text-gray-600">Hệ thống tìm kiếm thông minh giúp bạn dễ dàng lọc và tìm ký túc xá phù hợp với nhu cầu cá nhân.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin đáng tin cậy</h3>
              <p className="text-gray-600">Thông tin và hình ảnh chính xác, được cập nhật thường xuyên từ các ký túc xá đối tác của chúng tôi.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Đặt phòng nhanh chóng</h3>
              <p className="text-gray-600">Quy trình đặt phòng đơn giản, nhanh chóng và bảo mật, giúp tiết kiệm thời gian cho sinh viên.</p>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}