import PageContentHeader from "@/components/shared/page-content-header";
import AddCategory from "./cagetory-add";

export default function CategoriesMain() {
  return (
    <div>
      <PageContentHeader
        title="Medicine Categories"
        content="Organize medicines by category to keep your store clear, searchable, and easy to manage."
      >
        <AddCategory />
      </PageContentHeader>
    </div>
  );
}
