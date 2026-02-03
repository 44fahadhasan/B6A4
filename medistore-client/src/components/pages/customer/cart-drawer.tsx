"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ICartItemList } from "@/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useMemo } from "react";

export default function CartDrawer({ items }: { items: ICartItemList[] }) {
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.priceAtAdd, 0),
    [items],
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <ScrollArea className="flex-1 mt-4 pr-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b py-4"
              >
                <img
                  src={item.medicine?.image || "/placeholder.png"}
                  alt={item.medicine?.name}
                  className="h-14 w-14 rounded-md object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.medicine?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ৳{item.priceAtAdd} × {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ৳{item.priceAtAdd * item.quantity}
                </p>

                <Button size="icon" variant="ghost">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          )}
        </ScrollArea>

        {/* Summary */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>৳{subtotal}</span>
          </div>
        </div>

        {/* Actions */}
        <SheetFooter className="mt-4">
          <Button className="w-full">Place Order</Button>
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
