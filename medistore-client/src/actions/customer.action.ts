"use server";

import { TDeliveryAddress } from "@/form-schemas/delivery-address-form.schema";
import { customerService } from "@/services/customer.service";
import { IOrder } from "@/types/order";
import { revalidateTag } from "next/cache";

export async function mangeDeliveryAddress(payload: TDeliveryAddress) {
  const res = await customerService.mangeDeliveryAddress(payload);
  return res;
}
export async function getDeliveryAddress() {
  const res = await customerService.getDeliveryAddress();
  return res;
}

export async function createOrder(payload: IOrder) {
  const res = await customerService.createOrder(payload);

  if (res.success) {
    revalidateTag("medicines", "max");
  }

  return res;
}
