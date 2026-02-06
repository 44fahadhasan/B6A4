import { getCategories } from "@/actions/category.action";
import { EmptyBox } from "@/components/shared/empty-box";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCategoryParams } from "@/services/category.service";
import { MoreHorizontalIcon } from "lucide-react";
import AddCategory from "./category-add";
import CategoryDelete from "./category-delete";
import UpdateCategory from "./category-update";

export default async function CategoryTable({
  params,
}: {
  params: TCategoryParams;
}) {
  const { success, data, message } = await getCategories(params);

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  return (
    <div className="space-y-5">
      <Pagination meta={data.meta} />
      <Card className="px-3 md:px-5 lg:px-7">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <EmptyBox label="category">
                    <AddCategory />
                  </EmptyBox>
                </TableCell>
              </TableRow>
            ) : (
              data.categories.map((categorie: any, idx: number) => (
                <TableRow key={categorie.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">
                    {categorie.name}
                  </TableCell>
                  <TableCell>{categorie.slug}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <UpdateCategory data={categorie} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <CategoryDelete categorieId={categorie.id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
