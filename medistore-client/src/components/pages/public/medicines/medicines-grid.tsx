import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IMedicineCard } from "@/types";
import { format } from "date-fns";
import { AlertTriangle, Calendar, Pill, Warehouse } from "lucide-react";
import AddCartItem from "../../customer/cart-item/add-card-item";

export default function MedicineGrid({
  medicines,
}: {
  medicines: IMedicineCard[];
}) {
  return (
    <div className="flex flex-wrap gap-5">
      {medicines.map((medicine: IMedicineCard) => {
        const isLowStock = medicine.stock && medicine.stock.availableQty <= 7;
        return (
          <Card key={medicine.id} className="max-w-62.5">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {medicine.categorie?.name || "Uncategorized"}
                </Badge>
                {medicine.isOutOfStock ? (
                  <Badge variant="destructive">Unavailable</Badge>
                ) : isLowStock ? (
                  <Badge className="bg-yellow-500 text-primary-foreground">
                    Low stock
                  </Badge>
                ) : (
                  <Badge className="bg-green-600 text-primary-foreground">
                    In stock
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight">
                  {medicine.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {medicine.genericName} {medicine.strength || ""}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-muted-foreground" />
                <span>
                  {medicine.dosageForm} · {medicine.manufacturer || "—"}
                </span>
              </div>
              {medicine.isOutOfStock ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  <span>No active stock batch</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4 text-muted-foreground" />
                    <span>{medicine.stock!.availableQty} units available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Exp: {format(medicine.stock!.expiryDate, "PPP")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <p className="text-sm line-through text-muted-foreground">
                        ৳{medicine.stock!.mrp}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        ৳{medicine.stock!.sellingPrice}
                      </p>
                    </div>
                    <Badge className="bg-blue-600 text-primary-foreground">
                      ৳{medicine.stock!.discount} OFF
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <AddCartItem medicine={medicine} />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
