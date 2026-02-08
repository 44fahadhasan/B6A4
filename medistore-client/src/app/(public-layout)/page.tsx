import { Faqs } from "@/components/pages/public/home/Faqs/faqs";
import { FeaturedMedicine } from "@/components/pages/public/home/feature-medicines/featured-medicine";

import Hero from "@/components/pages/public/home/hero/herot";
import Testimonials from "@/components/pages/public/home/testimonials/testimonials";
import Wrapper from "@/components/shared/wrapper";

export default function HomePage() {
  return (
    <Wrapper>
      <Hero />
      <FeaturedMedicine />
      <Faqs />
      <Testimonials />
    </Wrapper>
  );
}
