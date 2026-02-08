import { env } from "@/env";
import {
  TInventory,
  TInventoryUpdate,
} from "@/form-schemas/inventory-form.schema";
import { IPaginationOptions, IQueryParams } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export type TInventoryParams = IPaginationOptions & IQueryParams;

export const inventoryService = {
  getInventories: async function (params?: TInventoryParams) {
    try {
      const url = new URL(`${API_URL}/inventories`);
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
        next: { tags: ["inventories"] },
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

  createInventory: async function (payload: TInventory) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/inventories/inventory/create`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

  updateInventory: async function ({
    id,
    payload,
  }: {
    id: string;
    payload: TInventoryUpdate;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/inventories/inventory/update/${id}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

  deleteInventory: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/inventories/inventory/delete/${id}`, {
        method: "DELETE",
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
