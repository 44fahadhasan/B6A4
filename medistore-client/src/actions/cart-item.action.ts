"use server";

import { cartitemService } from "@/services/cart-item.service";
import { ICartItem, ICartItemUpdate } from "@/types";
import { revalidateTag } from "next/cache";

export async function getCartItems() {
  const res = await cartitemService.getCartItems();
  return res;
}

export async function createCartItem(payload: ICartItem) {
  const res = await cartitemService.createCartItem(payload);

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

export async function updateCartItem({
  id,
  payload,
}: {
  id: string;
  payload: ICartItemUpdate;
}) {
  const res = await cartitemService.updateCartItem({ id, payload });

  if (res.success) {
    revalidateTag("carts", "max");
  }

  return res;
}
