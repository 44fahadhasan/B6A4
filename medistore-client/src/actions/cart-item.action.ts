"use server";

import { cartitemService } from "@/services/cart-item.service";
import { ICartItem } from "@/types";
import { revalidateTag } from "next/cache";

export async function getCartItems() {
  const res = await cartitemService.getCartItems();
  return res;
}

export async function mageCartItem(payload: ICartItem) {
  const res = await cartitemService.mageCartItem(payload);

  if (res.success) {
    revalidateTag("carts", "max");
  }

  return res;
}

export async function deleteCartItem(id: string) {
  const res = await cartitemService.deleteCartItem(id);

  if (res.success) {
    revalidateTag("carts", "max");
  }

  return res;
}

export async function clearCart(ids: string[]) {
  const res = await cartitemService.clearCart(ids);

  if (res.success) {
    revalidateTag("carts", "max");
  }

  return res;
}
