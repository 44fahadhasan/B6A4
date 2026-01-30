import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email("Email is required."),
  password: z.string().min(1, "Password is required."),
});
