import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import DownLoadBanner from '@/components/DownLoadBanner';
import AdsBanner from '@/components/AdsBanner';
import FeaturedPosts from './_components/FeaturedPosts';
import FAQ from '@/components/FAQ';
import HowWork from '@/components/HowWork';
import Testimonials from '@/components/Testimonials';
import FeaturedDomitory from './_components/FeaturedDomitory';

export default function HomePageMain() {
  const postsData = [
    {
      date: "28/09/2023",
      title: "5 mẹo tiết kiệm chi phí khi ở ký túc xá",
      description: "Khám phá các mẹo giúp bạn tiết kiệm chi phí sinh hoạt hàng tháng khi ở ký túc xá mà vẫn đảm bảo chất lượng cuộc sống.",
      link: "/blog/5-meo-tiet-kiem"
    },
    {
      date: "15/09/2023",
      title: "Cách hòa nhập nhanh chóng với môi trường ký túc xá",
      description: "Những lời khuyên hữu ích giúp các tân sinh viên hòa nhập nhanh chóng và tạo dựng mối quan hệ tốt với bạn cùng phòng.",
      link: "/blog/hoa-nhap-ky-tuc-xa"
    },
    {
      date: "05/09/2023",
      title: "Top 10 ký túc xá được yêu thích nhất tại Đà Nẵng",
      description: "Khám phá danh sách 10 ký túc xá được sinh viên đánh giá và yêu thích nhất tại Đà Nẵng năm 2023.",
      link: "/blog/top-10-ktx-da-nang"
    }
  ];
    return (
        <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <Hero />
        {/* Search Section */}
        <SearchSection />
        {/* Featured Dormitories */}
        <FeaturedDomitory />
        {/* Why Choose Us */}
        <AdsBanner />
        {/* FAQ Section */}
        <FAQ />
        {/* How It Works Section */}
        <HowWork />
        {/* Testimonials */}
        <Testimonials />
        {/* Featured Blog Posts */}
        <FeaturedPosts posts={postsData} />
        {/* Download App */}
        <DownLoadBanner />   
        </div>
  );
} 