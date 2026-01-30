import Link from "next/link";

export default function TermsAndPrivacy() {
  return (
    <p className="mt-8 text-muted-foreground text-sm">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms-of-service"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
