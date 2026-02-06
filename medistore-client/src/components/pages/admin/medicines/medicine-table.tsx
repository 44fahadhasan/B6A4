import { getMedicinesForAdmin } from "@/actions/medicine.action";
import Pagination from "@/components/shared/pagination";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCategoryParams } from "@/services/category.service";
import { Inbox } from "lucide-react";

export default async function MedicineTable({
  params,
}: {
  params: TCategoryParams;
}) {
  const { success, data, message } = await getMedicinesForAdmin(params);

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
              <TableHead>Medicine Details</TableHead>
              <TableHead>Dosage & Form</TableHead>
              <TableHead>Pharmacy & Owner</TableHead>
              <TableHead>Regulatory Info</TableHead>
              <TableHead className="text-right">Listed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.medicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={20}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyTitle>No Medicines Available</EmptyTitle>
                      <EmptyDescription>
                        No pharmacies have listed any medicines yet. Once
                        pharmacies add products, they will appear here for
                        administrative monitoring.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.medicines.map((medicine: any, idx: number) => (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Generic: {medicine.genericName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Manufacturer: {medicine.manufacturer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Brand: {medicine.brandName || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {medicine.categorie?.name || "Uncategorized"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>{medicine.dosageForm}</p>
                      <p className="text-xs text-muted-foreground">
                        Strength: {medicine.strength || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Pack: {medicine.packSize || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{medicine.pharmacie.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {medicine.pharmacie.owner.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {medicine.pharmacie.owner.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>
                        Prescription:{" "}
                        {medicine.isPrescriptionRequired
                          ? "Required"
                          : "Not Required"}
                      </p>
                      <p>
                        Drug Controlled:{" "}
                        {medicine.isControlledDrug ? "Yes" : "No"}
                      </p>
                      <p>Featured: {medicine.isFeatured ? "Yes" : "No"}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(medicine.createdAt).toLocaleDateString()}
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
