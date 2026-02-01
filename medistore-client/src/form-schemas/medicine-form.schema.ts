import { z } from "zod";

export const medicineFormSchema = z.object({
  name: z.string().min(1, "Medicine name is required").max(150),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  genericName: z.string().min(1, "Generic name is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  dosageForm: z.string().min(1, "Dosage form is required"), 
  description: z.string(),
  brandName: z.string(),
  strength: z.string(),
  packSize: z.string(),
  drugCode: z.string(),
  categorieId: z.string().min(1, "Category is required"),
  isControlledDrug: z.boolean(),
  isPrescriptionRequired: z.boolean(),
  isFeatured: z.boolean(),
});

export type TMedicine = z.infer<typeof medicineFormSchema>;
