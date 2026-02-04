import { getPharmaciesForSeller } from "@/actions/pharmacies.action";
import { EmptyBox } from "@/components/shared/empty-box";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TPharmacieParams } from "@/services/pharmacies.service";
import { MoreHorizontalIcon } from "lucide-react";
import AddPharmacy from "./pharmacie-add";
import PharmacieDelete from "./pharmacie-delete";
import UpdatePharmacie from "./pharmacie-update";

export default async function PharmacyTable({
  params,
}: {
  params: TPharmacieParams;
}) {
  const { success, data, message } = await getPharmaciesForSeller(params);

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  console.log(data?.pharmacies);

  return (
    <div className="space-y-5">
      <Pagination meta={data.meta} />
      <Card className="px-3 md:px-5 lg:px-7">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-left">S. No.</TableHead>
              <TableHead>Pharmacy</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pharmacies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyBox label="pharmacy">
                    <AddPharmacy />
                  </EmptyBox>
                </TableCell>
              </TableRow>
            ) : (
              data.pharmacies.map((pharmacie: any, idx: number) => (
                <TableRow key={pharmacie.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">Name: {pharmacie.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Slug: {pharmacie.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Email: {pharmacie.email || "N/A"}</p>
                      <p className="text-muted-foreground">
                        Phone:{pharmacie.phoneNumber}
                      </p>
                      <p className="text-xs">City: {pharmacie.city}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant={
                          pharmacie.status === "active"
                            ? "default"
                            : pharmacie.status === "suspended"
                              ? "destructive"
                              : "secondary"
                        }
                        className="capitalize"
                      >
                        {pharmacie.status}
                      </Badge>
                      {pharmacie.isVerified ? (
                        <Badge variant="outline">Verified</Badge>
                      ) : (
                        <Badge variant="secondary">Not Verified</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p>Licence: {pharmacie.licenceNumber}</p>
                    <p className="text-muted-foreground">
                      Trade: {pharmacie.tradeLicense}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p>Inventories: {pharmacie._count.inventories}</p>
                    <p>Medicines: {pharmacie._count.medicines}</p>
                    <p>Cart Items: {pharmacie._count.pharmacieOrders}</p>
                    <p>Orders: {pharmacie._count.pharmacieOrders}</p>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(pharmacie.createdAt).toLocaleDateString()}
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
                          <UpdatePharmacie data={pharmacie} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <PharmacieDelete pharmacieId={pharmacie.id} />
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
