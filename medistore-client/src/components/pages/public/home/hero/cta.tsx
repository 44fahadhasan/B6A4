import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-4 border-y px-4 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <PlusIcon
        className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6"
        strokeWidth={1}
      />

      <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
      <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />

      <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />

      <h2 className="text-center font-semibold text-xl md:text-3xl">
        Start Selling Medicines Online Today!
      </h2>
      <p className="text-balance text-center font-medium text-muted-foreground text-sm md:text-base">
        Join MediStore as a verified pharmacy or medicine seller. Reach more
        customers, manage orders easily, and grow your healthcare business with
        our all-in-one platform.
      </p>

      <div className="flex items-center justify-center gap-2">
        <Button asChild variant="outline">
          <Link href="/contact-us">Talk to Sales</Link>
        </Button>
        <Button asChild>
          <Link href="/seller-singup">
            Become a Seller <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
