import Link from 'next/link';

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tìm phòng ký túc xá dễ dàng tại Đà Nẵng</h1>
              <p className="text-xl mb-8">Nền tảng đặt phòng ký túc xá toàn diện nhất dành cho sinh viên</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/dormitories" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-gray-100 transition">
                  Tìm ký túc xá
                </Link>
                <Link href="/about" className="border border-white text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-white hover:text-blue-600 transition">
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gray-800 opacity-30"></div>
                <div className="relative h-full w-full">
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <img src="/home/bg.jpg" alt="Hình ảnh ký túc xá" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}