"use client";

import { getCategoriesList } from "@/actions/category.action";
import CheckboxSearch from "@/components/shared/checkbox-search";
import InputSearch from "@/components/shared/input-search";
import RangeSearch from "@/components/shared/range-search";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function MedicineFilters({ className }: { className?: string }) {
  const [categories, setCategories] = useState<
    { id: string; label: string; value: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const { success, data } = await getCategoriesList();
      if (success) setCategories(data);
    })();
  }, []);

  return (
    <Card className={cn("px-5 space-y-5", className)}>
      <InputSearch
        paramName="search"
        placeholder="Search by medicine, generic name  or manufacturer…"
      />
      <RangeSearch min={0} max={10000} step={10} />
      <div className="space-y-3">
        <h3 className="text-base font-bold">Available Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <CheckboxSearch
              key={cat.id}
              id={`cat-${cat.id}`}
              label={cat.label}
              paramName="category"
              value={cat.value}
              className="min-w-37.5"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
