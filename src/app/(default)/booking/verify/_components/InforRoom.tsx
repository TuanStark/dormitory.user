'use client'
import  formatCurrency  from "@/lib/common/currentcy";



export default function InforRoom({bookingData}: {bookingData: any}) {

  

    return (
        <div className="w-full lg:w-5/12 mt-8 lg:mt-0">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-gray-100 shadow-lg h-full">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Thông tin phòng</h3>
          
          {/* Hình ảnh phòng */}
          <div className="mb-6 overflow-hidden rounded-xl relative">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={typeof bookingData.room.images?.[0] === 'string' ? bookingData.room.images[0] : "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"} 
                alt={`Phòng ${bookingData.room.roomNumber}`}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {formatCurrency(bookingData.totalAmount)}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800">Phòng {bookingData.room.roomNumber}</h4>
            <p className="text-gray-600">{bookingData.building.name}</p>
            <div className="flex items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600 ml-1 text-sm">{bookingData.building.address}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Loại phòng:</span>
              <span className="font-medium">{'Tiêu chuẩn'}</span>
            </div>
            
            
            
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Tiện ích:</span>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Wifi</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Điều hòa</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Nước nóng</span>
              </div>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-gray-600 font-medium">Tổng thanh toán:</span>
              <span className="font-bold text-blue-600 text-lg">{formatCurrency(bookingData.totalAmount)}</span>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-700">
                Vui lòng kiểm tra kỹ thông tin phòng trước khi tiến hành đặt phòng.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}