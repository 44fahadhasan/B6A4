"use server";

import { TCategoryPost } from "@/form-schemas/category-form.schema";
import { categoryService, TCategoryParams } from "@/services/category.service";
import { revalidateTag } from "next/cache";

export async function getCategories(params?: TCategoryParams) {
  const res = await categoryService.getCategories(params);
  return res;
}

export async function createCategory(payload: TCategoryPost) {
  const res = await categoryService.createCategory(payload);

  if (res.success) {
    revalidateTag("categories", "max");
  }

  return res;
}

export async function deleteCategory(id: string) {
  const res = await categoryService.deleteCategory(id);

  if (res.success) {
    revalidateTag("categories", "max");
  }

  return res;
}

export async function updateCategory({
  id,
  payload,
}: {
  id: string;
  payload: TCategoryPost;
}) {
  const res = await categoryService.updateCategory({ id, payload });

  if (res.success) {
    revalidateTag("categories", "max");
  }

  return res;
}
