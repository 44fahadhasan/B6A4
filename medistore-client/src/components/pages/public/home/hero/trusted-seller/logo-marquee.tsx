import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";
import { logos } from "./trusted.seller.data";

export function LogoMarquee() {
  return (
    <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo, idx) => (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={50}
            height={50}
            key={`logo-${idx}`}
            className="pointer-events-none h-5 select-none md:h-10 dark:brightness-0 dark:invert"
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
