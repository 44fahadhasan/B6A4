import AddCategory from "@/components/pages/admin/categories/category-add";
import CategoryTable from "@/components/pages/admin/categories/category-table";
import InputSearch from "@/components/shared/input-search";
import PageContentHeader from "@/components/shared/page-content-header";
import Wrapper from "@/components/shared/wrapper";
import { TCategoryParams } from "@/services/category.service";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<TCategoryParams>;
}) {
  const params = await searchParams;

  return (
    <Wrapper>
      <PageContentHeader
        title="Medicine Categories"
        content="Organize medicines by category to keep your store clear, searchable, and easy to manage."
      >
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 w-full">
          <InputSearch
            name="search"
            className="max-sm:max-w-full"
            placeholder="Search category by name ..."
          />
          <AddCategory />
        </div>
      </PageContentHeader>
      <CategoryTable params={params} />
    </Wrapper>
  );
}
