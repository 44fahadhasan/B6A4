import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export const statsService = {
  getStatsForAdmin: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/stats/admin`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const { success, message, data } = await res.json();

      if (!success) {
        return {
          data: null,
          success,
          message,
        };
      }

      return {
        data,
        success,
        message,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as Error).message,
      };
    }
  },

  getStatsForSeller: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/stats/seller`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const { success, message, data } = await res.json();

      if (!success) {
        return {
          data: null,
          success,
          message,
        };
      }

      return {
        data,
        success,
        message,
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
