"use server";

import { ordersService, TOrderParams } from "@/services/orders.service";
import { TOrderUpdate } from "@/types/order";
import { revalidateTag } from "next/cache";

export async function getOrdersForAdmin(params?: TOrderParams) {
  const res = await ordersService.getOrdersForAdmin(params);
  return res;
}

export async function getOrdersForSeller(params?: TOrderParams) {
  const res = await ordersService.getOrdersForSeller(params);
  return res;
}

export async function getOrderForSeller(id: string) {
  const res = await ordersService.getOrderForSeller(id);
  return res;
}

export async function updatePharmacieOrder({
  id,
  payload,
}: {
  id: string;
  payload: TOrderUpdate;
}) {
  const res = await ordersService.updatePharmacieOrder({ id, payload });

  if (res.success) {
    revalidateTag("orders", "max");
  }

  return res;
}
