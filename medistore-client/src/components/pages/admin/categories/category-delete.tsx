"use client";

import { deleteCategory } from "@/actions/category.action";
import { DeleteModal } from "@/components/shared/delete-modal";
import { toast } from "sonner";

export default function CategoryDelete({
  categorieId,
}: {
  categorieId: string;
}) {
  const handleDelete = async (categoryId: string) => {
    const id = toast.loading("Delete category, please wait...");

    try {
      const { success, message } = await deleteCategory(categoryId);

      if (!success) {
        return toast.error(message, { id });
      }

      toast.success(message, { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };

  return <DeleteModal id={categorieId} handleDelete={handleDelete} />;
}
