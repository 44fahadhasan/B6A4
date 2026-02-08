"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="flex flex-col items-center p-8 gap-4 text-center shadow-lg">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-2xl font-bold text-foreground">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        <Button variant="default" onClick={() => reset()} className="mt-2">
          Try Again
        </Button>
      </Card>
    </div>
  );
}
