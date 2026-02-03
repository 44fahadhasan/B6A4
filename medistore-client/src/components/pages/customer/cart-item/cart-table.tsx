"use client";

import { Button } from "@/components/ui/button";
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
import { useMemo } from "react";

interface CartTableProps {
  items: ICartItemList[];
  onIncrease: (item: ICartItemList) => Promise<void>;
  onDecrease: (item: ICartItemList) => Promise<void>;
  onRemove: (item: ICartItemList) => Promise<void>;
  loadingIds?: string[];
}

export default function CartTable({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  loadingIds = [],
}: CartTableProps) {
  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => total + item.priceAtAdd * item.quantity, 0),
    [items],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Medicine</TableHead>
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
              <div>
                <p className="font-medium">{item.medicine.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.medicine.genericName} • {item.medicine.brandName} •{" "}
                  {item.medicine.categorie?.name}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-center">৳{item.priceAtAdd}</TableCell>
            <TableCell className="flex items-center justify-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDecrease(item)}
                disabled={item.quantity === 1 || loadingIds.includes(item.id)}
              >
                <Minus />
              </Button>
              <span className="w-6 text-center">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onIncrease(item)}
                disabled={loadingIds.includes(item.id)}
              >
                <Plus />
              </Button>
            </TableCell>
            <TableCell className="text-right font-semibold">
              ৳{item.quantity * item.priceAtAdd}
            </TableCell>
            <TableCell className="text-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onRemove(item)}
                disabled={loadingIds.includes(item.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-bold">Subtotal</TableCell>
          <TableCell className="text-center font-bold">৳{subtotal}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
