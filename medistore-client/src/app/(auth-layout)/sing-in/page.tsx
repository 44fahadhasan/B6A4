import SingInForm from "@/components/pages/public/auth/singin/singin-form";
import { Logo } from "@/components/shared/logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import TermsAndPrivacy from "@/components/shared/terms-and-privacy";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function SingInPage() {
  return (
    <div className="relative w-full md:h-screen md:overflow-hidden">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4">
        <Button asChild className="absolute top-4 left-4" variant="ghost">
          <Link href="/">
            <ChevronLeftIcon />
            Home
          </Link>
        </Button>
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="mx-auto space-y-4 sm:w-sm">
          <Link href="/">
            <Logo className="h-6" />
          </Link>
          <div className="flex flex-col space-y-1 mt-1">
            <h1 className="font-bold text-2xl tracking-wide">Welcome back</h1>
            <p className="text-base text-muted-foreground">
              Login to your medistore account
            </p>
          </div>
          <SingInForm />
          <TermsAndPrivacy />
        </div>
      </div>
    </div>
  );
}
