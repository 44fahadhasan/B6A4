"use server";

import { TCategoryPost } from "@/form-schemas/category-form.schema";
import { categoryService, TCategoryParams } from "@/services/category.service";

export async function getCategories(params?: TCategoryParams) {
  const res = await categoryService.getCategories(params);
  return res;
}

export async function createCategory(payload: TCategoryPost) {
  const res = await categoryService.createCategory(payload);
  return res;
}
