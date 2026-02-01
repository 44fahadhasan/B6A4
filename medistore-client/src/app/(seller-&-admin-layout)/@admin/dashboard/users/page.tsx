import UserTable from "@/components/pages/admin/users/user-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import { TMedicineParams } from "@/services/medicine.service";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<TMedicineParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-10">
      <PageContentHeader
        title="All Users"
        content="A complete overview of all registered users and their roles."
      >
        <InputSearch
          paramName="search"
          className="max-sm:max-w-full sm:max-w-md"
          placeholder="Search by user email…"
        />
      </PageContentHeader>
      <UserTable params={params} />
    </div>
  );
}
