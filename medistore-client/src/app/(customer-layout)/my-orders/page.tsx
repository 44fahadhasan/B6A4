import MyOrderTable from "@/components/pages/customer/my-orders/my-order-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import SelectSearch from "@/components/shared/select-search";
import { orderStatus } from "@/constants/order.status";
import { IOrderQueryParams } from "@/services/customer.service";

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<IOrderQueryParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="My Orders"
        content="View and track all your medicine orders in one place."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            paramName="search"
            className="max-sm:max-w-full sm:max-w-md"
            placeholder="Search by order number…"
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
      <MyOrderTable params={params} />
    </div>
  );
}
