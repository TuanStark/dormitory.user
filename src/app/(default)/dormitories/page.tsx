
import PageBanner from '@/components/PageBanner';
import ListDormitory from './_components/ListDormitory';
import UniversalMap from './_components/UniversalMap';


// Dữ liệu mẫu về các ký túc xá
export default function DormitoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <PageBanner 
        title="Ký túc xá tại Đà Nẵng"
        subtitle="Khám phá các ký túc xá chất lượng cao với đầy đủ tiện nghi dành cho sinh viên"
        breadcrumbs={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Ký túc xá' }
        ]}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Map Section */}
        <UniversalMap fetchAllDormitories={true} />

        <ListDormitory />
      </main>
    </div>
  );
} 