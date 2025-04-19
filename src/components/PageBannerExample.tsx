import React from 'react';
import PageBanner from './PageBanner';

const PageBannerExample: React.FC = () => {
  // Example 1: Simple Banner with just a title
  const example1 = (
    <PageBanner 
      title="Ký túc xá tại Đà Nẵng" 
    />
  );
  
  // Example 2: Banner with title and subtitle
  const example2 = (
    <PageBanner 
      title="Tất cả ký túc xá" 
      subtitle="Khám phá các ký túc xá chất lượng cao tại Đà Nẵng với đầy đủ tiện nghi"
    />
  );
  
  // Example 3: Banner with breadcrumbs
  const example3 = (
    <PageBanner 
      title="Ký túc xá Đại học Bách Khoa" 
      subtitle="Thông tin chi tiết về ký túc xá và các phòng khả dụng"
      breadcrumbs={[
        { label: 'Trang chủ', href: '/' },
        { label: 'Ký túc xá', href: '/dormitories' },
        { label: 'Ký túc xá Đại học Bách Khoa' }
      ]}
    />
  );
  
  // Example 4: Custom background color instead of image
  const example4 = (
    <PageBanner 
      title="Đặt phòng ký túc xá" 
      subtitle="Hoàn tất thông tin đặt phòng của bạn"
      bgImage={undefined}
      bgColor="bg-gradient-to-r from-emerald-500 to-teal-700"
    />
  );
  
  // Example 5: Left-aligned banner with small height
  const example5 = (
    <PageBanner 
      title="Tài khoản của tôi" 
      align="left"
      height="small"
      showPattern={false}
    />
  );
  
  // Render the examples (in real usage, you would only use one banner per page)
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Example 1: Simple Banner</h2>
        {example1}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Example 2: With Subtitle</h2>
        {example2}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Example 3: With Breadcrumbs</h2>
        {example3}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Example 4: Custom Background Color</h2>
        {example4}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Example 5: Left-aligned & Small</h2>
        {example5}
      </div>
    </div>
  );
};

export default PageBannerExample; 