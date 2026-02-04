import { z } from "zod";

export const pharmacieFormSchema = z.object({
  name: z.string().min(1, "Pharmacy name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string(),
  licenceNumber: z.string().min(1, "Licence number is required"),
  gstNumber: z.string(),
  tradeLicense: z.string(),
  email: z.email(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  division: z.string().min(1, "Division is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(5, "Address is too short"),
});

export type TPharmacie = z.infer<typeof pharmacieFormSchema>;
