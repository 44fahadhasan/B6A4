"use client";

import { getCartItems } from "@/actions/cart-item.action";
import { createOrder, getDeliveryAddress } from "@/actions/customer.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TDeliveryAddress } from "@/form-schemas/delivery-address-form.schema";
import { IOrderItem } from "@/types/order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SelectDeliveryAddress from "./select-delivery-address";

type DeliveryAddressWithId = TDeliveryAddress & { id: string };

export function AddOrder() {
  const [addresses, setAddresses] = useState<DeliveryAddressWithId[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<IOrderItem[]>([]);

  useEffect(() => {
    (async () => {
      const [
        { success: successAddr, data: addrData },
        { success: successCart, data: cartData },
      ] = await Promise.all([getDeliveryAddress(), getCartItems()]);

      if (successAddr) {
        setAddresses(addrData);
        const defaultAddress = addrData.find(
          (a: TDeliveryAddress & { id: string }) => a.isDefault,
        );
        if (defaultAddress) setSelectedId(defaultAddress.id);
      }

      if (successCart) {
        setCartItems(
          cartData.map((item: any) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            priceAtAdd: item.priceAtAdd,
          })),
        );
      }
    })();
  }, []);

  const handleAddOrder = async () => {
    if (!selectedId) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const toastId = toast.loading("Placing your order...");

    try {
      const orderPayload = {
        deliveryAddressId: selectedId,
        items: cartItems,
      };

      const { success, message } = await createOrder(orderPayload);

      if (!success) {
        toast.error(message || "Failed to create order", { id: toastId });
        return;
      }

      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Delivery Address</DialogTitle>
          <DialogDescription>
            Choose where you want your medicines delivered
          </DialogDescription>
        </DialogHeader>
        <SelectDeliveryAddress
          addresses={addresses}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!selectedId} onClick={handleAddOrder}>
            Placing Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
