"use client";

import {
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/actions/cart-item.action";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICartItemList } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddOrder } from "../customer-order/add-order";
import CartTable from "./cart-table";

export default function CardItemList() {
  const [cartItems, setCartItems] = useState<ICartItemList[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { success, data } = await getCartItems();
      if (success) setCartItems(data.cartItems);
    })();
  }, []);

  const handleIncrease = async (item: ICartItemList) => {
    setLoadingIds((prev) => [...prev, item.id]);
    const toastId = toast.loading("Updating cart...");

    try {
      const { success, message } = await updateCartItem({
        id: item.id,
        payload: { quantity: item.quantity + 1 },
      });

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );

      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const handleDecrease = async (item: ICartItemList) => {
    if (item.quantity === 1) return;

    setLoadingIds((prev) => [...prev, item.id]);
    const toastId = toast.loading("Updating cart...");

    try {
      const { success, message } = await updateCartItem({
        id: item.id,
        payload: { quantity: item.quantity - 1 },
      });

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      setCartItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      );

      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const handleRemove = async (item: ICartItemList) => {
    setLoadingIds((prev) => [...prev, item.id]);
    const toastId = toast.loading("Removing item...");

    try {
      const { success, message } = await deleteCartItem(item.id);

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="default"
          className="relative flex items-center justify-center"
        >
          <ShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-primary-foreground">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your selected medicines before placing your order.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[50vh]">
          <CartTable
            items={cartItems}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            loadingIds={loadingIds}
          />
        </ScrollArea>
        <SheetFooter className="flex flex-col gap-2">
          <AddOrder />
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
