import InventoryTable from "@/components/pages/seller/inventories/inventory-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import { TInventoryParams } from "@/services/inventory.service";

export default async function InventoriesPage({
  searchParams,
}: {
  searchParams: Promise<TInventoryParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="Medicines Inventory"
        content="Easily manage and track all medicines. Monitor stock levels, batches, expiry dates, and reserved quantities for safe and efficient pharmacy inventory management."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            paramName="search"
            className="max-sm:max-w-full sm:max-w-md"
            placeholder="Search by medicine name, batch number, category or brand..."
          />
        </div>
      </PageContentHeader>
      <InventoryTable params={params} />
    </div>
  );
}
