"use client";

import { deleteCartItem, mageCartItem } from "@/actions/cart-item.action";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICartItemList } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { toast } from "sonner";

export default function CartTable({
  items,
  setRefetchFlag,
}: {
  items: ICartItemList[];
  setRefetchFlag: Dispatch<SetStateAction<boolean>>;
}) {
  const handleMageCartItem = async ({
    item,
    actionLabel,
  }: {
    item: ICartItemList;
    actionLabel: "increment" | "decrement";
  }) => {
    const toastId = toast.loading("Updating cart...");

    try {
      const payload = {
        quantity: 1,
        actionLabel,
        medicineId: item.medicine.id,
        pharmacieId: item.pharmacie.id,
      };

      const { success, message } = await mageCartItem(payload);

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      setRefetchFlag((pre) => !pre);
      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleRemove = async (item: ICartItemList) => {
    const toastId = toast.loading("Removing item...");

    try {
      const { success, message } = await deleteCartItem(item.id);

      if (!success) {
        toast.error(message, { id: toastId });
        return;
      }

      setRefetchFlag((pre) => !pre);
      toast.success(message, { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => total + item.priceAtAdd * item.quantity, 0),
    [items],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Medicine</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <ScrollArea className="max-w-38">
                <p className="font-medium">{item.medicine.name}</p>
                <div className="text-xs text-muted-foreground">
                  <p>Generic:{item.medicine.genericName}</p>
                  <p>Brand: {item.medicine.brandName}</p>
                  <p>Categorie: {item.medicine.categorie?.name}</p>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TableCell>
            <TableCell className="text-center">৳{item.priceAtAdd}</TableCell>
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  onClick={() =>
                    handleMageCartItem({
                      item,
                      actionLabel: "decrement",
                    })
                  }
                  disabled={item.quantity === 1}
                >
                  <Minus />
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  size="icon"
                  onClick={() =>
                    handleMageCartItem({
                      item,
                      actionLabel: "increment",
                    })
                  }
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-center font-semibold">
              ৳{item.quantity * item.priceAtAdd}
            </TableCell>
            <TableCell className="text-center">
              <Button
                size="icon"
                variant="destructive"
                onClick={() => handleRemove(item)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {items.length > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-bold">
              Subtotal
            </TableCell>
            <TableCell className="text-center font-bold">৳{subtotal}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
