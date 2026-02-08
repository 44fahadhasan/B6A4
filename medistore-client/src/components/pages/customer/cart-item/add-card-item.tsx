"use client";

import { mageCartItem } from "@/actions/cart-item.action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMedicineCard } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddCartItem({
  medicine,
  className,
}: {
  className?: string;
  medicine: IMedicineCard;
}) {
  const [cartAction, setCartAction] = useState<boolean>(false);

  useEffect(() => {
    window.dispatchEvent(new Event("cart_action"));
  }, [cartAction]);

  const handleAddCartItem = async () => {
    const id = toast.loading("Add item to cart, please wait...");

    try {
      const { success, message } = await mageCartItem({
        quantity: 1,
        actionLabel: "increment",
        medicineId: medicine.id,
        pharmacieId: medicine.pharmacie.id,
        priceAtAdd: medicine.stock?.sellingPrice,
      });

      if (!success) {
        const errMsg =
          message === "Unauthorized!" ? "Please sign in to continue." : message;

        return toast.error(errMsg, { id });
      }
      setCartAction((pre) => !pre);
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
