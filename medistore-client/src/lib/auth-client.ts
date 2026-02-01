import {
  ac,
  adminRole,
  customerRole,
  sellerRole,
} from "@/constants/permission.const";
import { UserRole } from "@/constants/role.const";
import { env } from "@/env";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  basePath: env.NEXT_PUBLIC_BASE_PATH,
  plugins: [
    adminClient({
      ac,
      roles: {
        [UserRole.customer]: customerRole,
        [UserRole.seller]: sellerRole,
        [UserRole.admin]: adminRole,
      },
    }),
  ],
});
