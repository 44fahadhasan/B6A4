import { getInventories } from "@/actions/inventory.action";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
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
  Empty,
  EmptyContent,
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
import { TInventoryParams } from "@/services/inventory.service";
import { MoreHorizontalIcon, Package } from "lucide-react";
import AddMedicine from "../medicines/medicine-add";
import InventoryDelete from "./inventory-delete";
import UpdateInventory from "./inventory-update";

export default async function InventoryTable({
  params,
}: {
  params: TInventoryParams;
}) {
  const { success, data, message } = await getInventories(params);

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
              <TableHead className="w-12 text-left">S. No.</TableHead>
              <TableHead>Medicine Details</TableHead>
              <TableHead>Stock Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Batch & Expiry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.inventories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Package />
                      </EmptyMedia>
                      <EmptyTitle>No Medicines in Inventory</EmptyTitle>
                      <EmptyDescription>
                        Your stock is empty. Add medicines with batch and expiry
                        to get started.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <AddMedicine />
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.inventories.map((inventory: any, idx: number) => (
                <TableRow key={inventory.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{inventory.medicine.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Generic: {inventory.medicine.genericName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Brand: {inventory.medicine?.brandName || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Category: {inventory.medicine?.categorie?.name || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>Stock: {inventory.stock}</p>
                      <p>Min Stock: {inventory.minStock}</p>
                      <p>Low Threshold: {inventory.lowStockThreshold}</p>
                      <p>Reserved: {inventory.reservedQty}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <Badge
                        variant={
                          inventory.isOutOfStock ? "destructive" : "default"
                        }
                      >
                        {inventory.isOutOfStock ? "Out of Stock" : "In Stock"}
                      </Badge>
                      {inventory.isExpired && (
                        <Badge variant="destructive" className="ml-2">
                          Expired
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <p>Batch No.: {inventory.batchNumber}</p>
                    <p>
                      Expiry:{" "}
                      {new Date(inventory.expiryDate).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <UpdateInventory data={inventory} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <InventoryDelete inventoryId={inventory.id} />
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
