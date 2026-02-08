import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Package, Pill, ShieldCheck, Store } from "lucide-react";
import AddCartItem from "../../customer/cart-item/add-card-item";

const MedicineDetails = ({ medicine }: { medicine: any }) => {
  const stock = medicine.stock;
  const isOutOfStock =
    medicine.isOutOfStock || !stock || stock.availableQty <= 0;
  const discountPrice = stock
    ? stock.sellingPrice - (stock.sellingPrice * stock.discount) / 100
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="bg-secondary border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-background border border-border rounded-xl">
            <Pill className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-foreground">
              {medicine.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {medicine.genericName} · {medicine.strength} ·{" "}
              {medicine.dosageForm}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{medicine.manufacturer}</Badge>
              <Badge variant="secondary">{medicine.categorie?.name}</Badge>
              {medicine.isPrescriptionRequired && (
                <Badge variant="destructive">Prescription Required</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg text-foreground">
              Pricing & Availability
            </h3>
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

            {isOutOfStock ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : (
              <Badge variant="secondary">
                In Stock • {stock.availableQty} units
              </Badge>
            )}

            <AddCartItem medicine={medicine} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-4 text-sm text-muted-foreground">
            <h3 className="font-semibold text-lg text-foreground">
              Product Info
            </h3>
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
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold text-lg">Medicine Details</h3>
            <p>
              <b>Generic:</b> {medicine.genericName}
            </p>
            <p>
              <b>Brand:</b> {medicine.manufacturer}
            </p>
            <p>
              <b>Dosage Form:</b> {medicine.dosageForm}
            </p>
            <p>
              <b>Strength:</b> {medicine.strength}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Safety
            </h3>
            <p>Controlled Drug: {medicine.isControlledDrug ? "Yes" : "No"}</p>
            <p>
              Prescription Required:{" "}
              {medicine.isPrescriptionRequired ? "Yes" : "No"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Store className="w-5 h-5" /> Pharmacy
            </h3>
            <p className="font-medium">{medicine.pharmacie.name}</p>
            <p>{medicine.pharmacie.slug}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicineDetails;
