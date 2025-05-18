import { Room, Dormitory } from "@/lib/type";
import formatCurrency from "@/lib/common/currentcy";
import Link from "next/link";

interface ListRoomProps {
    rooms: Room[];
    dormitory: Dormitory;
}

export default function ListRoom({ rooms, dormitory }: ListRoomProps) {
    return (
        <>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Danh sách phòng trống</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Tất cả loại phòng</option>
                    <option>Phòng 2 người</option>
                    <option>Phòng 4 người</option>
                    <option>Phòng 6 người</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Sắp xếp: Giá thấp đến cao</option>
                    <option>Sắp xếp: Giá cao đến thấp</option>
                    <option>Mới nhất</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div key={room.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={room?.images?.[0]?.url || '/placeholder-room.jpg'} 
                        alt={`Phòng ${room.roomNumber}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                          {room.capacity} người/phòng
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">Phòng {room.roomNumber}</h3>
                      <div className="flex items-center text-gray-600 mb-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {room.area} m²
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.amenities?.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                            {amenity.amenityName}
                          </span>
                        ))}
                        {room.amenities?.length > 3 && (
                          <span className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded">
                            +{room.amenities.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-blue-600">{formatCurrency(room.price)}<span className="text-sm font-normal text-gray-500">/tháng</span></div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link href={`/rooms/${room.id}`} className="flex-1 text-blue-600 border border-blue-600 text-center px-3 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
                          Xem chi tiết
                        </Link>
                        <Link href={`/booking/verify?dormId=${dormitory.id}&roomId=${room.id}`} className="flex-1 bg-blue-600 text-white text-center px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                          Đặt phòng
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
    )
}