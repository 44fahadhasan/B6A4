import { Badge } from "@/components/ui/badge";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Calendar, Package, Pill } from "lucide-react";
import Link from "next/link";

export default function FeatureMedicineCard({ medicine }: { medicine: any }) {
  const stock = medicine.stock;
  const isOutOfStock =
    medicine.isOutOfStock || !stock || stock.availableQty <= 0;
  const discountPrice = stock
    ? stock.sellingPrice - (stock.sellingPrice * stock.discount) / 100
    : 0;

  return (
    <div className="relative overflow-hidden rounded-xl border bg-muted/30 p-5 hover:shadow-lg transition">
      <Link href={`/medicines/${medicine.id}`}>
        <div className="-mt-2 -ml-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 size-full">
          <GridPattern
            className="absolute inset-0 size-full stroke-primary/30"
            height={40}
            width={40}
            x={5}
          />
        </div>
        <Pill aria-hidden className="size-6 text-primary" strokeWidth={1.5} />
        <h3 className="mt-5 text-base font-semibold">{medicine.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Generic: {medicine.genericName}
        </p>
        <p className="text-xs text-muted-foreground">
          Manufacturer: {medicine.manufacturer}
        </p>
        <p className="text-xs text-muted-foreground">
          Dosage: {medicine.dosageForm} ({medicine.strength})
        </p>
        <div className="mt-4 space-y-1">
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{discountPrice.toFixed(2)}
            </span>
            {stock?.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ৳{stock.sellingPrice}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            MRP ৳{stock?.mrp} per pack
          </p>
        </div>
        <div className="mt-3">
          {isOutOfStock ? (
            <Badge variant="destructive">Out of Stock</Badge>
          ) : (
            <Badge variant="secondary">
              In Stock • {stock.availableQty} units
            </Badge>
          )}
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Pack Size: {stock?.packSize || "N/A"}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Expiry:{" "}
            {stock?.expiryDate
              ? new Date(stock.expiryDate).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </Link>
    </div>
  );
}
