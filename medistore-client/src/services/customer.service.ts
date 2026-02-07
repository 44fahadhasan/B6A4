import { env } from "@/env";
import { TDeliveryAddress } from "@/form-schemas/delivery-address-form.schema";
import { Treview } from "@/form-schemas/review-form.schema";
import { IPaginationOptions, IQueryParams } from "@/types";
import { IOrder } from "@/types/order";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export type IOrderQueryParams = IPaginationOptions & IQueryParams;

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

  getMyOrders: async function (params?: IOrderQueryParams) {
    try {
      const url = new URL(`${API_URL}/customers/orders`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const api = url.toString();
      const cookieStore = await cookies();

      const res = await fetch(api, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["orders"],
        },
        cache: "force-cache",
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

  getMyOrder: async function (orderId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/customers/orders/order/${orderId}`, {
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

  addReview: async function (payload: Treview) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews/review/add`, {
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
