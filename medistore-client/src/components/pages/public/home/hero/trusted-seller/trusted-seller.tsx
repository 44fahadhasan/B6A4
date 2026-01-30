import { LogoMarquee } from "./logo-marquee";

export default function TrustedSeller() {
  return (
    <section className="relative mx-auto max-w-3xl">
      <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
        <span className="text-muted-foreground">Trusted by pharmacies.</span>
        <br />
        <span className="font-semibold">Powering top medicine sellers.</span>
      </h2>
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px max-w-sm bg-border" />
      <LogoMarquee />
      <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mt-5 h-px bg-border" />
    </section>
  );
}
