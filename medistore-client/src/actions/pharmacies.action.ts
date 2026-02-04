"use server";

import { TPharmacie } from "@/form-schemas/pharmacie-form.schema";
import {
  pharmaciesService,
  TPharmacieParams,
} from "@/services/pharmacies.service";
import { revalidateTag } from "next/cache";

export async function getPharmaciesForAdmin(params?: TPharmacieParams) {
  const res = await pharmaciesService.getPharmaciesForAdmin(params);
  return res;
}

export async function getPharmaciesForSeller(params?: TPharmacieParams) {
  const res = await pharmaciesService.getPharmaciesForSeller(params);
  return res;
}

export async function createPharmacie(payload: TPharmacie) {
  const res = await pharmaciesService.createPharmacie(payload);

  if (res.success) {
    revalidateTag("pharmacies", "max");
  }

  return res;
}

export async function updatePharmacie({
  id,
  payload,
}: {
  id: string;
  payload: TPharmacie;
}) {
  const res = await pharmaciesService.updatePharmacie({ id, payload });

  if (res.success) {
    revalidateTag("pharmacies", "max");
  }

  return res;
}

export async function deletePharmacie(id: string) {
  const res = await pharmaciesService.deletePharmacie(id);

  if (res.success) {
    revalidateTag("pharmacies", "max");
  }

  return res;
}
