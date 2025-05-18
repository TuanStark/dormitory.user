export default function AdvertisementBanner() {
    return (
        <>
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-white"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <span className="px-4 py-1 bg-white bg-opacity-20 text-sm font-medium rounded-full mb-6 inline-block backdrop-blur-sm border border-white border-opacity-20 transform hover:scale-105 transition duration-300">Ưu đãi mùa hè 2025</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Tận hưởng <span className="text-yellow-300">cuộc sống</span> ký túc xá hiện đại</h2>
                <p className="text-xl mb-8 text-blue-100 max-w-lg">Khám phá dịch vụ ký túc xá cao cấp với đầy đủ tiện nghi và dịch vụ chăm sóc sinh viên chuyên nghiệp</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a href="#" className="group bg-white text-indigo-600 px-8 py-4 rounded-xl flex items-center justify-center hover:bg-indigo-50 hover:scale-105 transition duration-300 font-medium shadow-lg shadow-indigo-700/30">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Đặt phòng ngay
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl flex items-center justify-center hover:bg-white hover:text-indigo-600 transition duration-300 font-medium backdrop-blur-sm hover:shadow-lg">
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md transform hover:scale-[1.02] transition-all duration-500">
                  <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl opacity-50 blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl border border-indigo-400/30">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>
                    <div className="p-8 md:p-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="bg-white bg-opacity-20 rounded-lg p-2">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <div className="bg-yellow-400 text-indigo-900 text-sm font-bold px-4 py-1 rounded-full shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-300">Ưu đãi đặc biệt</div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-white text-3xl font-bold mb-2">Giảm 20%</h3>
                        <div className="text-2xl text-white font-light mb-2">cho sinh viên năm nhất</div>
                        <div className="flex items-center justify-center space-x-1 mb-6">
                          <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                          <span className="text-blue-100">Dành cho hợp đồng 12 tháng</span>
                          <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                        </div>
                        <div className="text-sm bg-white bg-opacity-20 px-4 py-2 rounded-lg inline-block backdrop-blur-sm">
                          Áp dụng từ 01/06 đến 31/08/2025
                        </div>
                      </div>
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