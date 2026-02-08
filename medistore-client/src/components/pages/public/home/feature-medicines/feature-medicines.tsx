import { getFeatureMedicines } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Pill } from "lucide-react";
import Link from "next/link";
import FeatureMedicineCard from "./featured-medicine-card";

export default async function FeatureMedicines() {
  const { data, message, success } = await getFeatureMedicines();

  if (!success) {
    return (
      <div className="p-10 text-center text-destructive">
        Failed to load medicine. {message}
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div>
        {data.medicines.length === 0 ? (
          <Empty className="py-20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Pill className="h-6 w-6 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>No Featured Medicines</EmptyTitle>
              <EmptyDescription>
                There are currently no medicines selected to be shown in the
                featured section. Once products are added, they will appear here
                for customers to explore.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline">
                <Link href="/medicines">Browse All Medicines</Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {data.medicines.map((medicine: any) => (
              <FeatureMedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}
      </div>
      {data.medicines.length > 12 && (
        <div className="flex justify-center">
          <Button asChild size="sm">
            <Link href="/medicines?featured=true">View All</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
