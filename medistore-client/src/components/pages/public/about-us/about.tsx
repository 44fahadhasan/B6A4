import { cn } from "@/lib/utils";
import { Heart, Package, Shield, Users } from "lucide-react";
import type React from "react";

export function AboutUs() {
  const features = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We prioritize your health and convenience, providing top-notch support and reliable services.",
    },
    {
      icon: Package,
      title: "Fast Delivery",
      description:
        "Get your medications delivered quickly and safely across Bangladesh with tracking options.",
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description:
        "Your data and orders are secure. We follow strict privacy and safety protocols.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our platform is supported by healthcare professionals to ensure accurate information.",
    },
  ];

  return (
    <div className="mx-auto h-full min-h-screen max-w-5xl lg:border-x">
      {/* Header */}
      <div className="flex flex-col justify-center px-4 py-18 md:items-center">
        <h1 className="font-bold text-4xl md:text-5xl">About Us</h1>
        <p className="mb-5 text-base text-muted-foreground text-center max-w-3xl">
          Welcome to Medistore – your reliable online medistore platform,
          offering safe, fast, and convenient access to a wide range of
          medicines and healthcare products.
        </p>
      </div>

      <BorderSeparator />

      {/* Our Story */}
      <section className="px-4 py-12 md:py-16">
        <h2 className="font-semibold text-2xl md:text-3xl mb-4">Our Story</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
          Founded with a vision to simplify access to quality medicines,
          Medistore has grown into a trusted online pharmacy platform serving
          thousands of customers nationwide. Our mission is to empower everyone
          to manage their health conveniently and safely.
        </p>
      </section>

      <BorderSeparator />

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 px-4 py-12 md:py-16 gap-8">
        <div>
          <h3 className="font-medium text-xl md:text-2xl mb-3">Our Mission</h3>
          <p className="text-muted-foreground text-base">
            To provide fast, safe, and accessible healthcare solutions online,
            ensuring every customer can easily get their required medicines and
            healthcare products.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-xl md:text-2xl mb-3">Our Vision</h3>
          <p className="text-muted-foreground text-base">
            To become the most trusted and comprehensive online medistore
            platform in Bangladesh, known for innovation, reliability, and
            excellent customer experience.
          </p>
        </div>
      </section>

      <BorderSeparator />

      {/* Features / Why Choose Us */}
      <section className="px-4 py-12 md:py-16">
        <h2 className="font-semibold text-2xl md:text-3xl mb-6 text-center">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
            >
              <feature.icon className="size-6 mb-4 text-accent" />
              <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BorderSeparator />

      {/* Team / Values */}
      <section className="px-4 py-12 md:py-16 text-center">
        <h2 className="font-semibold text-2xl md:text-3xl mb-4">
          Our Core Values
        </h2>
        <p className="text-muted-foreground text-base max-w-3xl mx-auto">
          At Medistore, we believe in integrity, transparency, and putting our
          customers first. Our dedicated team of professionals ensures that
          every order is handled with care, every query is answered promptly,
          and your health remains our top priority.
        </p>
      </section>
    </div>
  );
}

function BorderSeparator({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("absolute inset-x-0 h-px w-full border-b", className)} />
  );
}
