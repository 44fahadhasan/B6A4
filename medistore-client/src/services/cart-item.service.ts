import { env } from "@/env";
import { ICartItem, ICartItemUpdate } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export const cartitemService = {
  getCartItems: async function () {
    try {
      const url = new URL(`${API_URL}/customers/medicine/cart-item/list`);

      const api = url.toString();
      const cookieStore = await cookies();

      const res = await fetch(api, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["carts"] },
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

  createCartItem: async function (payload: ICartItem) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customers/medicine/cart-item/add`, {
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

  updateCartItem: async function ({
    id,
    payload,
  }: {
    id: string;
    payload: ICartItemUpdate;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/customers/medicine/cart-item/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

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

  deleteCartItem: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/customers/medicine/cart-item/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

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
