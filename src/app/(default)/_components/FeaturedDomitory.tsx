import Link from "next/link";
import DormitoryCard from "./DormitoryCard";
import { fetchDormitories } from "@/lib/api";
import { Building } from "@/lib/type";
// Đánh dấu component là async để hỗ trợ data fetching
export default async function FeaturedDomitory() {
  // Fetch data trực tiếp trong Server Component
  const dormitories = await fetchDormitories();
  
  return (
    <>
        <section className="py-16 bg-gray-600">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Ký túc xá nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dormitories.map((dormitory) => (
                        <DormitoryCard key={dormitory.id}
                            dormitory={dormitory as unknown as Building}
                        />
                    ))}

                </div>
                <div className="text-center mt-12">
                    <Link href="/dormitories" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition">
                        Xem tất cả ký túc xá
                    </Link>
                </div>
            </div>
        </section>
    </>
)
}