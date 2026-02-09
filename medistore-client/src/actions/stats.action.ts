"use server";

import { statsService } from "@/services/stats.service";

export async function getStatsForAdmin() {
  const res = await statsService.getStatsForAdmin();
  return res;
}

export async function getStatsForSeller() {
  const res = await statsService.getStatsForSeller();
  return res;
}
