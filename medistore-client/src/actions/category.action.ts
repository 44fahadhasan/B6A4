"use server";

import { TCategoryPost } from "@/form-schemas/category-form.schema";
import { categoryService } from "@/services/category.service";

export default async function createCategory(payload: TCategoryPost) {
  const res = await categoryService.postCategory(payload);
  return res;
}
