"use client";

import PageBanner from './PageBanner';
import Link from 'next/link';

export default function BannerUsageExamples() {
  return (
    <div className="space-y-12 mb-12">
      <section className="space-y-8">
        <h1 className="text-3xl font-bold text-center mt-8 mb-12">Ví dụ sử dụng Banner cho từng trang</h1>
        
        {/* Trang chủ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-4">Trang chủ - Banner lớn với ảnh nền</h2>
          <PageBanner 
            title="Tìm kiếm ký túc xá phù hợp với bạn"
            subtitle="Khám phá và đặt phòng tại các ký túc xá chất lượng cao tại Đà Nẵng"
            height="large"
            bgImage="/images/banner-bg.jpg"
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="Tìm kiếm ký túc xá phù hợp với bạn"
  subtitle="Khám phá và đặt phòng tại các ký túc xá chất lượng cao tại Đà Nẵng"
  height="large"
  bgImage="/images/banner-bg.jpg"
/>`}
            </pre>
          </div>
        </div>

        {/* Trang danh sách */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-4">Trang danh sách - Banner với breadcrumbs</h2>
          <PageBanner 
            title="Ký túc xá tại Đà Nẵng"
            subtitle="Khám phá các ký túc xá chất lượng cao với đầy đủ tiện nghi dành cho sinh viên"
            breadcrumbs={[
              { label: 'Trang chủ', href: '/' },
              { label: 'Ký túc xá' }
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="Ký túc xá tại Đà Nẵng"
  subtitle="Khám phá các ký túc xá chất lượng cao với đầy đủ tiện nghi dành cho sinh viên"
  breadcrumbs={[
    { label: 'Trang chủ', href: '/' },
    { label: 'Ký túc xá' }
  ]}
/>`}
            </pre>
          </div>
        </div>

        {/* Trang chi tiết */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-4">Trang chi tiết - Banner với breadcrumbs nhiều cấp</h2>
          <PageBanner 
            title="KTX Đại học Bách Khoa"
            subtitle="54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng"
            breadcrumbs={[
              { label: 'Trang chủ', href: '/' },
              { label: 'Ký túc xá', href: '/dormitories' },
              { label: 'KTX Đại học Bách Khoa' }
            ]}
            height="large"
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="KTX Đại học Bách Khoa" 
  subtitle="54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng"
  breadcrumbs={[
    { label: 'Trang chủ', href: '/' },
    { label: 'Ký túc xá', href: '/dormitories' },
    { label: 'KTX Đại học Bách Khoa' }
  ]}
  height="large"
/>`}
            </pre>
          </div>
        </div>

        {/* Trang đặt phòng */}
        <div className="space-y-4">
          <h2 className="text-xl font-semblance px-4">Trang đặt phòng - Màu nền tùy chỉnh</h2>
          <PageBanner 
            title="Đặt phòng ký túc xá"
            subtitle="Hoàn tất thông tin đặt phòng của bạn"
            bgImage={undefined}
            bgColor="bg-gradient-to-r from-emerald-500 to-teal-700"
            breadcrumbs={[
              { label: 'Trang chủ', href: '/' },
              { label: 'Ký túc xá', href: '/dormitories' },
              { label: 'KTX Đại học Bách Khoa', href: '/dormitories/2' },
              { label: 'Đặt phòng' }
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="Đặt phòng ký túc xá" 
  subtitle="Hoàn tất thông tin đặt phòng của bạn"
  bgImage={undefined}
  bgColor="bg-gradient-to-r from-emerald-500 to-teal-700"
  breadcrumbs={[
    { label: 'Trang chủ', href: '/' },
    { label: 'Ký túc xá', href: '/dormitories' },
    { label: 'KTX Đại học Bách Khoa', href: '/dormitories/2' },
    { label: 'Đặt phòng' }
  ]}
/>`}
            </pre>
          </div>
        </div>

        {/* Trang tài khoản */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-4">Trang tài khoản - Banner nhỏ và căn trái</h2>
          <PageBanner 
            title="Thông tin tài khoản"
            align="left"
            height="small"
            showPattern={false}
            breadcrumbs={[
              { label: 'Trang chủ', href: '/' },
              { label: 'Tài khoản' }
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="Thông tin tài khoản"
  align="left"
  height="small"
  showPattern={false}
  breadcrumbs={[
    { label: 'Trang chủ', href: '/' },
    { label: 'Tài khoản' }
  ]}
/>`}
            </pre>
          </div>
        </div>

        {/* Trang liên hệ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-4">Trang liên hệ - Banner với màu chữ tùy chỉnh</h2>
          <PageBanner 
            title="Liên hệ với chúng tôi"
            subtitle="Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn"
            bgColor="bg-gradient-to-r from-purple-600 to-indigo-800"
            textColor="text-gray-100"
          />
          <div className="bg-white rounded-lg shadow p-6 mx-4">
            <h3 className="font-semibold mb-2">Cách sử dụng:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`<PageBanner 
  title="Liên hệ với chúng tôi"
  subtitle="Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn"
  bgColor="bg-gradient-to-r from-purple-600 to-indigo-800"
  textColor="text-gray-100"
/>`}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mx-4 mt-8">
          <h2 className="text-2xl font-bold mb-6">Giải thích thuộc tính</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thuộc tính</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kiểu dữ liệu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mặc định</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">title</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">required</td>
                  <td className="px-6 py-4 text-gray-500">Tiêu đề chính của banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">subtitle</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">undefined</td>
                  <td className="px-6 py-4 text-gray-500">Tiêu đề phụ hiển thị bên dưới tiêu đề chính</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">bgImage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'/images/banner-bg.jpg'</td>
                  <td className="px-6 py-4 text-gray-500">Đường dẫn đến hình nền cho banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">bgColor</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'bg-gradient-to-r from-blue-600 to-indigo-800'</td>
                  <td className="px-6 py-4 text-gray-500">Màu nền khi không sử dụng hình nền</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">textColor</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'text-white'</td>
                  <td className="px-6 py-4 text-gray-500">Màu chữ trong banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">align</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'left' | 'center' | 'right'</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'center'</td>
                  <td className="px-6 py-4 text-gray-500">Căn chỉnh nội dung trong banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">height</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'small' | 'medium' | 'large'</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">'medium'</td>
                  <td className="px-6 py-4 text-gray-500">Kích thước chiều cao của banner</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">breadcrumbs</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Array&lt;{`{label: string, href?: string}`}&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">undefined</td>
                  <td className="px-6 py-4 text-gray-500">Đường dẫn điều hướng hiển thị phía trên tiêu đề</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">showPattern</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">true</td>
                  <td className="px-6 py-4 text-gray-500">Hiển thị hoặc ẩn họa tiết nền</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="bg-white rounded-lg shadow p-6 m-4">
        <h2 className="text-xl font-bold mb-4">Hướng dẫn sử dụng</h2>
        <ol className="list-decimal ml-5 space-y-3">
          <li>Import component <code className="bg-gray-100 px-1 py-0.5 rounded">PageBanner</code> vào file của bạn</li>
          <li>Thêm component <code className="bg-gray-100 px-1 py-0.5 rounded">&lt;PageBanner&gt;</code> vào vị trí đầu của trang</li>
          <li>Cung cấp các thuộc tính cần thiết: <code className="bg-gray-100 px-1 py-0.5 rounded">title</code> (bắt buộc) và các thuộc tính tùy chọn khác</li>
          <li>Điều chỉnh các thuộc tính để phù hợp với thiết kế trang của bạn</li>
          <li>Đảm bảo đã có file hình ảnh nền tại đường dẫn bạn chỉ định (nếu sử dụng <code className="bg-gray-100 px-1 py-0.5 rounded">bgImage</code>)</li>
        </ol>
      </div>

      <div className="p-4 text-center">
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
} 