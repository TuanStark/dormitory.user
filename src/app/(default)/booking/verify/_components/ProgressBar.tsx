

export default function ProgressBar({currentStep, BookingStep}: {currentStep: number, BookingStep: any}) {
    return (
        <>
             <div className="mb-12 relative bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Bước 1 */}
            <div className="flex flex-col items-center mb-4 md:mb-0 relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= BookingStep.USER_INFO 
                  ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-300/50' 
                  : 'bg-gray-100'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= BookingStep.USER_INFO 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white text-gray-400'
                }`}>
                  {currentStep > BookingStep.USER_INFO ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg font-bold">1</span>
                  )}
                </div>
              </div>
              <div className={`mt-3 font-medium text-center transition-all duration-300 ${
                currentStep >= BookingStep.USER_INFO ? 'text-blue-600' : 'text-gray-400'
              }`}>
                Thông tin
              </div>
              <div className={`text-xs mt-1 transition-all duration-300 ${
                currentStep >= BookingStep.USER_INFO ? 'text-blue-400' : 'text-gray-400'
              }`}>
                Xác nhận thông tin cá nhân
              </div>
            </div>
            
            {/* Bước 2 */}
            <div className="flex flex-col items-center mb-4 md:mb-0 relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= BookingStep.PAYMENT_METHOD 
                  ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-300/50' 
                  : 'bg-gray-100'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= BookingStep.PAYMENT_METHOD 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white text-gray-400'
                }`}>
                  {currentStep > BookingStep.PAYMENT_METHOD ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg font-bold">2</span>
                  )}
                </div>
              </div>
              <div className={`mt-3 font-medium text-center transition-all duration-300 ${
                currentStep >= BookingStep.PAYMENT_METHOD ? 'text-blue-600' : 'text-gray-400'
              }`}>
                Thanh toán
              </div>
              <div className={`text-xs mt-1 transition-all duration-300 ${
                currentStep >= BookingStep.PAYMENT_METHOD ? 'text-blue-400' : 'text-gray-400'
              }`}>
                Chọn phương thức thanh toán
              </div>
            </div>
            
            {/* Bước 3 */}
            <div className="flex flex-col items-center relative">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= BookingStep.CONFIRMATION 
                  ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-300/50' 
                  : 'bg-gray-100'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= BookingStep.CONFIRMATION 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white text-gray-400'
                }`}>
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div className={`mt-3 font-medium text-center transition-all duration-300 ${
                currentStep >= BookingStep.CONFIRMATION ? 'text-blue-600' : 'text-gray-400'
              }`}>
                Hoàn tất
              </div>
              <div className={`text-xs mt-1 transition-all duration-300 ${
                currentStep >= BookingStep.CONFIRMATION ? 'text-blue-400' : 'text-gray-400'
              }`}>
                Đặt phòng thành công
              </div>
            </div>
          </div>
          
          {/* Thanh tiến trình responsive */}
          <div className="md:hidden mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: currentStep === BookingStep.USER_INFO ? '33%' : currentStep === BookingStep.PAYMENT_METHOD ? '66%' : '100%' }}
            ></div>
          </div>
        </div>
        </>
    )
}