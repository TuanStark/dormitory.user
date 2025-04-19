import Link from "next/link";

export default function FAQ() {
    return (
        <>
            <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Câu hỏi thường gặp</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Làm thế nào để đăng ký phòng ký túc xá?</h3>
                <p className="text-gray-600">Bạn có thể dễ dàng đăng ký phòng bằng cách tạo tài khoản trên DormSpace, tìm ký túc xá phù hợp, chọn loại phòng và hoàn tất thanh toán đặt cọc trực tuyến.</p>
              </div>
            </div>
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tôi có cần đến xem phòng trước khi đặt không?</h3>
                <p className="text-gray-600">Bạn có thể xem chi tiết thông tin và hình ảnh thực tế của từng ký túc xá trên nền tảng của chúng tôi. Tuy nhiên, nếu bạn muốn trực tiếp tham quan, bạn có thể liên hệ với chúng tôi để sắp xếp lịch xem phòng.</p>
              </div>
            </div>
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Khi nào tôi cần thanh toán tiền phòng?</h3>
                <p className="text-gray-600">Khi đặt phòng, bạn cần thanh toán tiền đặt cọc (thường là 1-2 tháng tiền phòng). Tiền phòng hàng tháng sẽ được thanh toán theo quy định của từng ký túc xá.</p>
              </div>
            </div>
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Làm thế nào để hủy đặt phòng?</h3>
                <p className="text-gray-600">Bạn có thể hủy đặt phòng thông qua tài khoản của mình trên DormSpace. Chính sách hoàn tiền sẽ tùy thuộc vào thời điểm hủy và quy định của từng ký túc xá.</p>
              </div>
            </div>
            <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">DormSpace có cung cấp dịch vụ cho thuê ngắn hạn không?</h3>
                <p className="text-gray-600">Có, một số ký túc xá trên nền tảng của chúng tôi có cung cấp dịch vụ cho thuê ngắn hạn, đặc biệt là trong thời gian hè hoặc các dịp đặc biệt. Bạn có thể tìm hiểu thêm trong phần thông tin chi tiết của từng ký túc xá.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-block text-blue-600 font-medium hover:underline">
              Xem tất cả câu hỏi thường gặp
            </Link>
          </div>
        </div>
      </section>
        </>
    )
}