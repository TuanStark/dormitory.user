import Link from "next/link";

export default function HowWork() {
    return (
        <>
            <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Cách thức hoạt động</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-xl font-bold">1</span>
                <div className="absolute w-8 h-0.5 bg-blue-200 -right-8 top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tìm kiếm</h3>
              <p className="text-gray-600">Sử dụng bộ lọc thông minh để tìm ký túc xá phù hợp với nhu cầu và ngân sách của bạn.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-xl font-bold">2</span>
                <div className="absolute w-8 h-0.5 bg-blue-200 -right-8 top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">So sánh</h3>
              <p className="text-gray-600">Xem thông tin chi tiết, hình ảnh và đánh giá từ sinh viên khác để so sánh các lựa chọn.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 relative">
                <span className="text-xl font-bold">3</span>
                <div className="absolute w-8 h-0.5 bg-blue-200 -right-8 top-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Đặt phòng</h3>
              <p className="text-gray-600">Đặt phòng trực tuyến với quy trình đơn giản, nhanh chóng và bảo mật.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Nhận phòng</h3>
              <p className="text-gray-600">Nhận phòng theo lịch hẹn và bắt đầu trải nghiệm cuộc sống ký túc xá của bạn.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/about" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Tìm hiểu thêm về quy trình
            </Link>
          </div>
        </div>
      </section>
        </>
    )
}