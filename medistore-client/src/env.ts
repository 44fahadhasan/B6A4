import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
  server: {
    BACKEND_API_URL: z.url("Backend api url is required"),
  },
  client: {
    // better auth
    NEXT_PUBLIC_BASE_URL: z.url("Base url messing of better auth"),
    NEXT_PUBLIC_BASE_PATH: z.string("Base path messing better auth"),
    NEXT_PUBLIC_CALLBACK_URL: z.url("Callback url messing better auth"),
  },

  runtimeEnv: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,

    // better auth
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_CALLBACK_URL: process.env.NEXT_PUBLIC_CALLBACK_URL,
  },
});
