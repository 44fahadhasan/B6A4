import { TestimonialsColumn } from "./testimonials-columns";
import { testimonials } from "./testimonials.data";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-4">
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1">Testimonials</div>
          </div>

          <h2 className="font-bold text-3xl tracking-tighter lg:text-4xl">
            What our users say
          </h2>
          <p className="text-center text-muted-foreground text-sm">
            See what our customers have to say about us.
          </p>
        </div>

        <div className="mt-10 flex max-h-185 justify-center gap-6 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn duration={16} testimonials={firstColumn} />
          <TestimonialsColumn
            className="hidden md:block"
            duration={20}
            testimonials={secondColumn}
          />
          <TestimonialsColumn
            className="hidden lg:block"
            duration={18}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </section>
  );
}
