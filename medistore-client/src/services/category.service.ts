import { env } from "@/env";
import { TCategoryPost } from "@/form-schemas/category-form.schema";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export const categoryService = {
  postCategory: async function (payload: TCategoryPost) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/categories/categorie/create`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

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
