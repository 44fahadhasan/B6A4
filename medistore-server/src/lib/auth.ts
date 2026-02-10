import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, customSession } from "better-auth/plugins";
import config from "../config";
import { allowedOrigins } from "../config/cors";
import { prisma } from "../config/prisma";
import {
  ac,
  adminRole,
  customerRole,
  sellerRole,
} from "../constants/permissions";
import UserRole from "../constants/roles";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  appName: config.site_name,
  baseURL: config.better_auth_url,
  basePath: config.better_auth_path,
  trustedOrigins: allowedOrigins,
  advanced: {
    cookiePrefix: config.site_name.toLocaleLowerCase(),
    defaultCookieAttributes: {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
      domain: config.better_auth_url!,
    },
  },
  emailAndPassword: { enabled: true, autoSignIn: false },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: UserRole.customer,
      },
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const result = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          role: true,
          pharmacies: {
            select: { id: true },
          },
        },
      });
      return {
        user: {
          ...user,
          role: result?.role as string,
          pharmacieId:
            result && result.pharmacies.length === 1
              ? result.pharmacies.at(0)?.id
              : null,
        },
        session,
      };
    }),
    admin({
      defaultRole: UserRole.customer,
      ac,
      roles: {
        [UserRole.customer]: customerRole,
        [UserRole.seller]: sellerRole,
        [UserRole.admin]: adminRole,
      },
    }),
  ],
});
