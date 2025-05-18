

export default function Testimonials() {
    return (
        <>
        <section className="py-16 bg-gray-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Sinh viên nói gì về chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Nguyễn Văn A</h4>
                  <p className="text-gray-600 text-sm">Sinh viên Đại học Đà Nẵng</p>
                </div>
              </div>
              <p className="text-gray-700">"DormSpace giúp mình tìm được phòng ký túc xá phù hợp chỉ trong vài giờ. Thông tin chính xác và đầy đủ, tiết kiệm rất nhiều thời gian!"</p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★★</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Trần Thị B</h4>
                  <p className="text-gray-600 text-sm">Sinh viên Đại học Bách Khoa</p>
                </div>
              </div>
              <p className="text-gray-700">"Giao diện dễ sử dụng, thông tin chi tiết và đúng thực tế. Mình đã tiết kiệm được rất nhiều thời gian so với việc đi tìm ký túc xá trực tiếp."</p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★</span><span className="text-gray-300">★</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Lê Văn C</h4>
                  <p className="text-gray-600 text-sm">Sinh viên Đại học Kinh tế</p>
                </div>
              </div>
              <p className="text-gray-700">"Không chỉ giúp tìm phòng, DormSpace còn cung cấp nhiều thông tin hữu ích về khu vực xung quanh ký túc xá. Rất hài lòng với dịch vụ!"</p>
              <div className="flex text-yellow-400 mt-4">
                <span>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}