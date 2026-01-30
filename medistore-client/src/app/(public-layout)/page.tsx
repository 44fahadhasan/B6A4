import { Faqs } from "@/components/pages/public/home/Faqs/faqs";
import Hero from "@/components/pages/public/home/hero/herot";
import Testimonials from "@/components/pages/public/home/testimonials/testimonials";
import Wrapper from "@/components/shared/wrapper";

export default function HomePage() {
  return (
    <Wrapper>
      <Hero />
      <Faqs />
      <Testimonials />
    </Wrapper>
  );
}
