import Link from 'next/link';
import Image from 'next/image';
import { Building } from '@/lib/type';
import  formatCurrency  from '@/lib/common/currentcy';
interface DormitoryCardProps {  
    dormitory: Building;
}

export default function DormitoryCard({ dormitory }: DormitoryCardProps) {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="relative h-60">
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <Image src={dormitory.image || '/default_building.jpg'} alt={dormitory.name} fill />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{dormitory.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Mới</span>
                </div>
                <p className="text-gray-600 mb-4">{dormitory.address}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <span>★★★★★</span>
                    <span className="ml-1 text-gray-600 text-sm">({dormitory.averageRating} đánh giá)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-800">{formatCurrency(dormitory.rooms[0]?.price || 0)}</div>
                  <Link href={`/dormitories/${dormitory.id}`} className="text-blue-600 hover:underline">
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
        </>
    )
}