import Link from 'next/link';

export default function SimilarDormitory() {
    return (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ký túc xá tương tự</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Similar Dormitory 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 1</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Đại học Bách Khoa</h3>
                <p className="text-gray-600 text-sm mb-2">54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">4.5</span>
                  <span className="ml-1 text-gray-600 text-xs">(87)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">700.000đ - 1.5tr/tháng</p>
                  <Link href="/dormitories/2" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Similar Dormitory 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 2</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Ngoại Ngữ</h3>
                <p className="text-gray-600 text-sm mb-2">131 Lương Nhữ Hộc, Khuê Trung, Cẩm Lệ, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">3.8</span>
                  <span className="ml-1 text-gray-600 text-xs">(62)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">600.000đ - 900.000đ/tháng</p>
                  <Link href="/dormitories/3" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Similar Dormitory 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">Hình ảnh KTX tương tự 3</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">KTX Kinh tế</h3>
                <p className="text-gray-600 text-sm mb-2">71 Ngũ Hành Sơn, Mỹ An, Ngũ Hành Sơn, Đà Nẵng</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-sm">4.0</span>
                  <span className="ml-1 text-gray-600 text-xs">(95)</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold">900.000đ - 1.4tr/tháng</p>
                  <Link href="/dormitories/4" className="text-sm text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}