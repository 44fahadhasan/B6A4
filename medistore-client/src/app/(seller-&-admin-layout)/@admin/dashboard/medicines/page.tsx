import MedicineTable from "@/components/pages/admin/medicines/medicine-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import { TMedicineParams } from "@/services/medicine.service";

export default async function AdminMedicinesPage({
  searchParams,
}: {
  searchParams: Promise<TMedicineParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="All Medicines"
        content="A complete overview of medicines from all pharmacies."
      >
        <InputSearch
          paramName="search"
          className="max-sm:max-w-full sm:max-w-md"
          placeholder="Search by medicine name, generic, manufacturer, or category…"
        />
      </PageContentHeader>
      <MedicineTable params={params} />
    </div>
  );
}
