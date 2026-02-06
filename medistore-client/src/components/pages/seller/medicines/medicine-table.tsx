import { getMedicinesForSeller } from "@/actions/medicine.action";
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
import { TMedicine } from "@/form-schemas/medicine-form.schema";
import { TCategoryParams } from "@/services/category.service";
import { MoreHorizontalIcon } from "lucide-react";
import AddInventory from "../inventories/inventory-add";
import AddMedicine from "./medicine-add";
import MedicineDelete from "./medicine-delete";
import UpdateMedicine from "./medicine-update";

export default async function MedicineTable({
  params,
}: {
  params: TCategoryParams;
}) {
  const { success, data, message } = await getMedicinesForSeller(params);

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
              <TableHead className="w-12 text-left">#</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Slug</TableHead>
              <TableHead className="text-left">Generic</TableHead>
              <TableHead className="text-left">Manufacturer</TableHead>
              <TableHead className="text-left">Dosage Form</TableHead>
              <TableHead className="text-center w-24">Batch No.</TableHead>
              <TableHead className="text-right w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.medicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyBox label="medicine">
                    <AddMedicine />
                  </EmptyBox>
                </TableCell>
              </TableRow>
            ) : (
              data.medicines.map(
                (medicine: TMedicine & { id: string }, idx: number) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {medicine.name}
                    </TableCell>
                    <TableCell>{medicine.slug}</TableCell>
                    <TableCell>{medicine.genericName}</TableCell>
                    <TableCell>{medicine.manufacturer}</TableCell>
                    <TableCell>{medicine.dosageForm}</TableCell>
                    <TableCell>
                      <AddInventory medicineId={medicine.id} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8"
                          >
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <UpdateMedicine data={medicine} />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <MedicineDelete medicineId={medicine.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
