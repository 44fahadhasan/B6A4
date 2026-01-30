import CustomerSingupForm from "@/components/pages/public/auth/customer-sinngup/sinngup-form";
import TermsAndPrivacy from "@/components/shared/terms-and-privacy";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function CustomerSingupPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      <Button asChild className="absolute top-7 left-5" variant="ghost">
        <Link href="/">
          <ChevronLeftIcon />
          Home
        </Link>
      </Button>
      {/* Radial spotlight */}
      <div
        aria-hidden="true"
        className={cn(
          "-top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-full",
          "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
          "blur-[30px]",
        )}
      />
      <div className="relative w-full max-w-md bg-background p-4">
        <div className="-left-px -inset-y-6 absolute w-px bg-border" />
        <div className="-right-px -inset-y-6 absolute w-px bg-border" />
        <div className="-top-px -inset-x-6 absolute h-px bg-border" />
        <div className="-bottom-px -inset-x-6 absolute h-px bg-border" />
        <PlusIcon
          className="-left-[12.5px] -top-[12.5px] absolute size-6"
          strokeWidth={0.5}
        />
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute size-6"
          strokeWidth={0.5}
        />

        <div className="items-left flex flex-col gap-1.5 justify-center rounded-md border bg-card p-4 shadow-xs outline outline-border/50 outline-offset-1">
          <h2 className="font-medium text-xl">Create Your Account</h2>
          <p className="text-muted-foreground text-sm">
            Sign up to order medicines, track your deliveries, and get access to
            trusted pharmacies—all in one place.
          </p>
        </div>
        <CustomerSingupForm />
        <TermsAndPrivacy />
      </div>
    </div>
  );
}
