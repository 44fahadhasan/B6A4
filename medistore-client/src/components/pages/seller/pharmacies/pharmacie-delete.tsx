"use client";

import { deletePharmacie } from "@/actions/pharmacies.action";
import { DeleteModal } from "@/components/shared/delete-modal";
import { toast } from "sonner";

export default function PharmacieDelete({
  pharmacieId,
}: {
  pharmacieId: string;
}) {
  const handleDelete = async (pharmacieId: string) => {
    const id = toast.loading("Delete pharmacie, please wait...");

    try {
      const { success, message } = await deletePharmacie(pharmacieId);

      if (!success) {
        return toast.error(message, { id });
      }

      toast.success(message, { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };

  return <DeleteModal id={pharmacieId} handleDelete={handleDelete} />;
}
