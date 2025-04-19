

export default function SearchSection() {
    return (
        <>
        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-20 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tìm ký túc xá phù hợp</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Khu vực</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả khu vực</option>
                  <option>Hải Châu</option>
                  <option>Thanh Khê</option>
                  <option>Liên Chiểu</option>
                  <option>Ngũ Hành Sơn</option>
                  <option>Sơn Trà</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Mức giá</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả mức giá</option>
                  <option>Dưới 1 triệu</option>
                  <option>1 - 1.5 triệu</option>
                  <option>1.5 - 2 triệu</option>
                  <option>Trên 2 triệu</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Loại phòng</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tất cả loại phòng</option>
                  <option>Phòng 2 người</option>
                  <option>Phòng 4 người</option>
                  <option>Phòng 6 người</option>
                  <option>Phòng 8 người</option>
                </select>
              </div>
              <div className="md:self-end">
                <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}