"use client";

import { createCartItem } from "@/actions/cart-item.action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMedicineCard } from "@/types";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function AddCartItem({
  quantity,
  medicine,
  className,
}: {
  quantity: number;
  className?: string;
  medicine: IMedicineCard;
}) {
  const handleAddCartItem = async () => {
    const id = toast.loading("Add item to cart, please wait...");

    try {
      const payload = {
        quantity,
        priceAtAdd: medicine.stock?.sellingPrice!,
        pharmacieId: medicine.pharmacie.id,
        medicineId: medicine.id,
      };

      const { success, message } = await createCartItem(payload);

      if (!success) {
        return toast.error("Already added in cart", { id });
      }

      toast.success(message, { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };

  return (
    <Button
      size="icon-lg"
      onClick={handleAddCartItem}
      disabled={medicine.isOutOfStock}
      className={cn("w-full gap-2", className)}
    >
      <ShoppingCart />
      {medicine.isOutOfStock ? "Unavailable" : "Add to cart"}
    </Button>
  );
}
