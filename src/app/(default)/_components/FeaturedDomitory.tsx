import Link from "next/link";
import DormitoryCard from "./DormitoryCard";

export default function FeaturedDomitory() {
    const dormitories = [
        {
            id: 1,
            image: 'https://via.placeholder.com/600x400',
            name: 'KTX Đại học Đà Nẵng',
            address: '54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng',
            rating: 4.5,
            price: 700000,
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/600x400',
            name: 'KTX Đại học Bách Khoa',
            address: '54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng',
            rating: 4.5,
            price: 700000,
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/600x400',
            name: 'KTX Đại học Bách Khoa',
            address: '54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng',
            rating: 4.5,
            price: 700000,
        },
    ];
    return (
        <>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ký túc xá nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dormitories.map((dormitory) => (
                            <DormitoryCard key={dormitory.id}
                                image={dormitory.image}
                                name={dormitory.name}
                                address={dormitory.address}
                                rating={dormitory.rating}
                                price={dormitory.price}
                            />
                        ))}

                    </div>
                    <div className="text-center mt-12">
                        <Link href="/dormitories" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                            Xem tất cả ký túc xá
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}