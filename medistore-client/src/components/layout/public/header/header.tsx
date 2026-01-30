"use client";

import { Logo } from "@/components/shared/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { navLinks } from "./nav.data";

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
        "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="py-2">
          <Logo className="h-4.5" />
        </Link>
        <div className="hidden gap-1 md:flex">
          {navLinks.map((link, i) => (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
              key={i}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden gap-1 md:flex">
          <Button asChild variant="outline">
            <Link href="/sing-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/customer-singup">Sign Up</Link>
          </Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
