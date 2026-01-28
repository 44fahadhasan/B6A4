import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../constants/roles";
import { auth as betterAuth } from "../lib/auth";
import sendResponse from "../utils/send-response.util";

const auth = (role: UserRole, permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return sendResponse(res, {
          success: false,
          statusCode: 401,
          message: "Unauthorized!",
        });
      }

      const { success } = await betterAuth.api.userHasPermission({
        body: {
          userId: session?.user.id,
          role: session?.user.role as UserRole,
          permission: {
            [role]: permissions,
          },
        },
      });

      if (!success) {
        return sendResponse(res, {
          success: false,
          statusCode: 403,
          message: "Forbidden!",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
