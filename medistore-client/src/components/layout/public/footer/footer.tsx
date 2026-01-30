import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "../../../shared/mode-toggle";
import { company, resources, socialLinks } from "./footer.data";

export function Footer() {
  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-5xl lg:border-x",
          "dark:bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <Link className="w-max" href="/">
              <Logo className="h-5" />
            </Link>
            <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm">
              A comprehensive popular online medistore platform.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="outline"
                >
                  <Link href={item.link} target="_blank">
                    <item.icon className="size-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <Link
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <Link
                  className="w-max text-sm hover:underline"
                  href={href}
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex items-center justify-around gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} medistore, All rights reserved
          </p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
