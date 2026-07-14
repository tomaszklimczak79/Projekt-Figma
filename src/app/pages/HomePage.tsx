import { HeroSection } from '../components/HeroSection';
import { TrustBar } from '../components/TrustBar';
import { FeaturedMacBooks } from '../components/FeaturedMacBooks';
import { Categories } from '../components/Categories';
import { WhyBuySection } from '../components/WhyBuySection';
import { DealsBanner } from '../components/DealsBanner';
import { Reviews } from '../components/Reviews';
import { FAQSection } from '../components/FAQSection';
import { Newsletter } from '../components/Newsletter';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedMacBooks />
      <Categories />
      <WhyBuySection />
      <DealsBanner />
      <Reviews />
      <FAQSection />
      <Newsletter />
    </>
  );
}
