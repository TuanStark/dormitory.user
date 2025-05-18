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
    return (
        <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <Hero />
        {/* Search Section */}
        <SearchSection />
        {/* Featured Dormitories */}
        <FeaturedDomitory/>
        {/* Why Choose Us */}
        <AdsBanner />
        {/* FAQ Section */}
        <FAQ />
        {/* How It Works Section */}
        <HowWork />
        {/* Testimonials */}
        <Testimonials />
        {/* Featured Blog Posts */}
        <FeaturedPosts />
        {/* Download App */}
        <DownLoadBanner />   
        </div>
  );
} 