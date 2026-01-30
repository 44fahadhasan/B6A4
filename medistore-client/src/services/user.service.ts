import { env } from "@/env";

const API_URL = env.BACKEND_API_URL;

export const userService = {
  getUserSession: async function () {
    try {
      const res = await fetch(`${API_URL}/`);
    } catch (error) {}
  },
};
