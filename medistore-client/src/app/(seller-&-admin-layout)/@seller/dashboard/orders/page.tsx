import SellerOrderTable from "@/components/pages/seller/orders/seller-order-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import SelectSearch from "@/components/shared/select-search";
import { orderStatus } from "@/constants/order.status";
import { IOrderQueryParams } from "@/services/customer.service";

export default async function SellerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<IOrderQueryParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="Customer Orders"
        content="View, manage, and update the status of all medicine orders placed for your pharmacy."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            paramName="search"
            className="max-sm:max-w-full sm:max-w-md"
            placeholder="Search by order number, user name, email, …"
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
      <SellerOrderTable params={params} />
    </div>
  );
}
