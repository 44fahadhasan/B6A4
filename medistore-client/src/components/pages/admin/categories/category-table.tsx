import { getCategories } from "@/actions/category.action";
import { TCategoryParams } from "@/services/category.service";

export default async function CategoryTable({
  params,
}: {
  params: TCategoryParams;
}) {
  const { success, data, message } = await getCategories(params);

  console.log(data);

  return <div>{message}</div>;
}
