"use client";

import { deleteMedicine } from "@/actions/medicine.action";
import { DeleteModal } from "@/components/shared/delete-modal";
import { toast } from "sonner";

export default function MedicineDelete({ medicineId }: { medicineId: string }) {
  const handleDelete = async (medicineId: string) => {
    const id = toast.loading("Delete medicine, please wait...");

    try {
      const { success, message } = await deleteMedicine(medicineId);

      if (!success) {
        return toast.error(message, { id });
      }

      toast.success(message, { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };

  return <DeleteModal id={medicineId} handleDelete={handleDelete} />;
}
