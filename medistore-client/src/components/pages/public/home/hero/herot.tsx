import Wrapper from "@/components/shared/wrapper";
import { CallToAction } from "./cta";
import TrustedSeller from "./trusted-seller/trusted-seller";

export default function Hero() {
  return (
    <Wrapper>
      <CallToAction />
      <TrustedSeller />
    </Wrapper>
  );
}
