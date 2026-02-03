import { getMedicines } from "@/actions/medicine.action";
import MedicineFilters from "@/components/pages/public/medicines/medicine-fileters";
import MedicinesGrid from "@/components/pages/public/medicines/medicines-grid";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IMedicineQueryParams } from "@/services/medicine.service";
import { Pill } from "lucide-react";

export default async function MedicinesShopPage({
  searchParams,
}: {
  searchParams: Promise<IMedicineQueryParams>;
}) {
  const params = await searchParams;

  const { success, data, message } = await getMedicines(params);

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  return (
    <div className="flex gap-8 mx-auto max-lg:px-5 max-w-7xl px-5">
      <div className="hidden lg:flex">
        <MedicineFilters />
      </div>
      <div className="space-y-5 flex-1">
        <div className="flex items-center gap-5">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button>Filters</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <MedicineFilters className="bg-transparent ring-0 shadow-none mt-10" />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex-1">
            <Pagination meta={data.meta} />
          </div>
        </div>
        {data.medicines.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Pill />
              </EmptyMedia>
              <EmptyTitle>No Medicines Available</EmptyTitle>
              <EmptyDescription>
                We couldn’t find any medicines to show right now. Please check
                back later or try searching for another product.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <MedicinesGrid medicines={data.medicines} />
        )}
      </div>
    </div>
  );
}
