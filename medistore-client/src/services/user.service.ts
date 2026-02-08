import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_BASE_URL + env.NEXT_PUBLIC_BASE_PATH;

export const userService = {
  getUserSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!result) {
        return {
          data: null,
          success: false,
          message: "Session not found",
        };
      }

      return {
        data: result,
        success: true,
        message: "Session get success!",
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as Error).message,
      };
    }
  },
};
