"use server";

import {
  TInventory,
  TInventoryUpdate,
} from "@/form-schemas/inventory-form.schema";
import {
  inventoryService,
  TInventoryParams,
} from "@/services/inventory.service";
import { revalidateTag } from "next/cache";

export async function getInventories(params?: TInventoryParams) {
  const res = await inventoryService.getInventories(params);
  return res;
}

export async function createInventory(payload: TInventory) {
  const res = await inventoryService.createInventory(payload);

  if (res.success) {
    revalidateTag("medicines", "max");
    revalidateTag("inventories", "max");
  }

  return res;
}

export async function updateInventory({
  id,
  payload,
}: {
  id: string;
  payload: TInventoryUpdate;
}) {
  const res = await inventoryService.updateInventory({ id, payload });

  if (res.success) {
    revalidateTag("medicines", "max");
    revalidateTag("inventories", "max");
  }

  return res;
}

export async function deleteInventory(id: string) {
  const res = await inventoryService.deleteInventory(id);

  if (res.success) {
    revalidateTag("medicines", "max");
    revalidateTag("inventories", "max");
  }

  return res;
}
