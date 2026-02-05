"use client";

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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SelectDeliveryAddress from "./select-delivery-address";
import SelectPaymentMethod from "./select-paymant-method";

type DeliveryAddressWithId = TDeliveryAddress & { id: string };

export function AddOrder() {
  const [addresses, setAddresses] = useState<DeliveryAddressWithId[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { success, data } = await getDeliveryAddress();

      if (success) {
        setAddresses(data);

        const defaultAddress = data.find(
          (a: TDeliveryAddress & { id: string }) => a.isDefault,
        );

        if (defaultAddress) setSelectedId(defaultAddress.id);
      }
    })();
  }, []);

  const handleAddOrder = async () => {
    if (!selectedId) {
      toast.error("Please select a delivery address");
      return;
    }

    const toastId = toast.loading("Placing your order...");

    try {
      const orderPayload = {
        deliveryAddressId: selectedId,
        payment: { method: "cash" },
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
        <SelectPaymentMethod />
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!selectedId} onClick={handleAddOrder}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
