import { z } from "zod";

export const inventoryFormSchema = z.object({
  stock: z.number().min(1, "Stock min 1 required"),
  minStock: z.number(),
  lowStockThreshold: z.number(),
  reservedQty: z.number(),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({ error: "Expiry date is required" }),
  mrp: z.number().min(1, "MRP min 1 is required"),
  discount: z.number(),
  purchasePrice: z.number(),
  sellingPrice: z.number().min(1, "Selling Price min 1 required"),
  damagedQty: z.number(),
  returnedQty: z.number(),
});

export const inventoryUpdateFormSchema = z.object({
  stock: z.number().min(1, "Stock min 1 required"),
  minStock: z.number(),
  lowStockThreshold: z.number(),
  reservedQty: z.number(),
  isOutOfStock: z.boolean(),
  batchNumber: z.string().min(1, "Batch number is required"),
  expiryDate: z.date({ error: "Expiry date is required" }),
  mrp: z.number().min(1, "MRP min 1 is required"),
  discount: z.number(),
  purchasePrice: z.number(),
  sellingPrice: z.number().min(1, "Selling Price min 1 required"),
  damagedQty: z.number(),
  returnedQty: z.number(),
  isExpired: z.boolean(),
});

export type TInventory = z.infer<typeof inventoryFormSchema> & {
  medicineId: string;
};

export type TInventoryUpdate = z.infer<typeof inventoryUpdateFormSchema>;
