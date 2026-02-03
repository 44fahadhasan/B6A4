import { env } from "@/env";
import { TDeliveryAddress } from "@/form-schemas/delivery-address-form.schema";
import { IOrder } from "@/types/order";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export const customerService = {
  mangeDeliveryAddress: async function (payload: TDeliveryAddress) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customers/delivery-address`, {
        method: "PUT",
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

  getDeliveryAddress: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customers/delivery-address`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
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

  createOrder: async function (payload: IOrder) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customers/orders/order/create`, {
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
