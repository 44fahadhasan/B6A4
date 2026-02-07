import AdminOrderTable from "@/components/pages/admin/orders/admin-order-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import SelectSearch from "@/components/shared/select-search";
import { orderStatus } from "@/constants/order.status";
import { IOrderQueryParams } from "@/services/customer.service";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<IOrderQueryParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="All Orders"
        content="Monitor, search, and manage all customer orders across every pharmacy in the system."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            paramName="search"
            className="max-sm:max-w-full sm:max-w-md"
            placeholder="Search by order number, customer name, email, or pharmacy…"
          />
          <div className="flex items-center gap-1">
            <SelectSearch
              paramName="status"
              className="min-w-fit"
              placeholder="Filter by status"
              id="status"
              label=""
              listItems={orderStatus}
            />
          </div>
        </div>
      </PageContentHeader>
      <AdminOrderTable params={params} />
    </div>
  );
}
