"use client";

import { getCartItems } from "@/actions/cart-item.action";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddOrder } from "../customer-order/add-order";
import CartTable from "./cart-table";

export default function CardItemList() {
  const [cartItems, setCartItems] = useState<ICartItemList[]>([]);
  const [refetchFlag, setRefetchFlag] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    try {
      (async () => {
        const { success, message, data } = await getCartItems();

        if (!success) {
          setError(message);
        }

        if (success) setCartItems(data);
      })();
    } catch (error) {
      setError(`${(error as Error).message}: Relaod page`);
    }
  }, [refetchFlag]);

  useEffect(() => {
    const cartAction = () => setRefetchFlag((pre) => !pre);

    cartAction();

    window.addEventListener("cart_action", cartAction);
    return () => window.removeEventListener("cart_action", cartAction);
  }, []);

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
      <SheetContent side="left" className="data-[side=left]:sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({cartItems.length})</SheetTitle>
          <SheetDescription>
            Review your selected medicines before placing your order.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[50vh]">
          {error ? (
            <p className="text-destructive">{error}</p>
          ) : cartItems.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShoppingCart className="text-destructive" />
                </EmptyMedia>
                <EmptyTitle>Your Cart is Empty</EmptyTitle>
                <EmptyDescription>
                  You haven’t added any items to your cart yet. Browse products
                  and add them to get started.
                </EmptyDescription>
                <SheetClose asChild>
                  <Button
                    onClick={() => router.push("/medicines")}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </EmptyHeader>
            </Empty>
          ) : (
            <CartTable items={cartItems} setRefetchFlag={setRefetchFlag} />
          )}
        </ScrollArea>
        <SheetFooter className="flex flex-col gap-2">
          {cartItems.length > 0 && <AddOrder />}
          <SheetClose asChild>
            {cartItems.length === 0 ? (
              <Button variant="outline" className="w-full">
                Close
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/medicines")}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
