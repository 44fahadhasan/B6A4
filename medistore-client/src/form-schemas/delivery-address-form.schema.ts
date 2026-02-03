import { z } from "zod";

export const deliveryAddressFormSchema = z.object({
  label: z.string(),
  country: z.string().min(1, "Country is required"),
  division: z.string(),
  city: z.string().min(1, "City is required"),
  area: z.string(),
  postalCode: z.string(),
  addressLine: z.string().min(5, "Address is too short"),
  contactNumber: z.string().min(1, "Contact number is required"),
  isDefault: z.boolean(),
});

export type TDeliveryAddress = z.infer<typeof deliveryAddressFormSchema>;
