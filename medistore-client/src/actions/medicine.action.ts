"use server";

import { TMedicine } from "@/form-schemas/medicine-form.schema";
import {
  IMedicineQueryParams,
  medicineService,
  TMedicineParams,
} from "@/services/medicine.service";
import { revalidateTag } from "next/cache";

export async function getMedicines(params?: IMedicineQueryParams) {
  const res = await medicineService.getMedicines(params);
  return res;
}

export async function getMedicinesForAdmin(params?: TMedicineParams) {
  const res = await medicineService.getMedicinesForAdmin(params);
  return res;
}

export async function getMedicinesForSeller(params?: TMedicineParams) {
  const res = await medicineService.getMedicinesForSeller(params);
  return res;
}

export async function createMedicine(payload: TMedicine) {
  const res = await medicineService.createMedicine(payload);

  if (res.success) {
    revalidateTag("medicines", "max");
  }

  return res;
}

export async function updateMedicine({
  id,
  payload,
}: {
  id: string;
  payload: TMedicine;
}) {
  const res = await medicineService.updateMedicine({ id, payload });

  if (res.success) {
    revalidateTag("medicines", "max");
  }

  return res;
}

export async function deleteMedicine(id: string) {
  const res = await medicineService.deleteMedicine(id);

  if (res.success) {
    revalidateTag("medicines", "max");
  }

  return res;
}
