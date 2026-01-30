import z from "zod";

export const formSchema = z.object({
  email: z.email("Email is required."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});
