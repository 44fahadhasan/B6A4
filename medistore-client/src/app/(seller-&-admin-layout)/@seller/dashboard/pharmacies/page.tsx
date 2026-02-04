import AddPharmacy from "@/components/pages/seller/pharmacies/pharmacie-add";
import PharmacyTable from "@/components/pages/seller/pharmacies/pharmacie-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import { TPharmacieParams } from "@/services/pharmacies.service";

export default async function SellerPharmaciesPage({
  searchParams,
}: {
  searchParams: Promise<TPharmacieParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="Pharmacy Directory"
        content="Manage and monitor all pharmacies under your account. Control their status, locations, and availability for accepting medicine orders."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            paramName="search"
            className="max-sm:max-w-full sm:max-w-md"
            placeholder="Search by pharmacy name or license number..."
          />
          <AddPharmacy />
        </div>
      </PageContentHeader>
      <PharmacyTable params={params} />
    </div>
  );
}
