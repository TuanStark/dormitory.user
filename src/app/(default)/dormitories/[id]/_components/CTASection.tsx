
export default function CTASection() {
    return (
        <div className="bg-blue-600 rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bạn quan tâm đến KTX này?</h2>
                    <p className="text-blue-100 mb-6">Đặt phòng ngay hôm nay để được giá ưu đãi và đảm bảo còn phòng trống cho học kỳ tới.</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                            Đặt phòng ngay
                        </button>
                        <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                            Liên hệ để tư vấn
                        </button>
                    </div>
                </div>
                <div className="md:w-1/3 h-40 md:h-auto">
                    <div className="w-full h-full bg-blue-700 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}