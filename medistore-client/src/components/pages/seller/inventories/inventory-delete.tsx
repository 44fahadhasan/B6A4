"use client";

import { deleteInventory } from "@/actions/inventory.action";
import { DeleteModal } from "@/components/shared/delete-modal";
import { toast } from "sonner";

export default function InventoryDelete({
  inventoryId,
}: {
  inventoryId: string;
}) {
  const handleDelete = async (inventoryId: string) => {
    const id = toast.loading("Delete inventory, please wait...");

    try {
      const { success, message } = await deleteInventory(inventoryId);

      if (!success) {
        return toast.error(message, { id });
      }

      toast.success(message, { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };

  return <DeleteModal id={inventoryId} handleDelete={handleDelete} />;
}
