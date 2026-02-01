import { env } from "@/env";
import { TMedicine } from "@/form-schemas/medicine-form.schema";
import { IPaginationOptions, IQueryParams } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export type TMedicineParams = IPaginationOptions & IQueryParams;

export const medicineService = {
  getMedicinesForAdmin: async function (params?: TMedicineParams) {
    try {
      const url = new URL(`${API_URL}/medicines/admin`);
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
        next: { tags: ["medicines"] },
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

  getMedicinesForSeller: async function (params?: TMedicineParams) {
    try {
      const url = new URL(`${API_URL}/medicines/seller`);
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
        next: { tags: ["medicines"] },
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

  createMedicine: async function (payload: TMedicine) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicines/medicine/create`, {
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

  updateMedicine: async function ({
    id,
    payload,
  }: {
    id: string;
    payload: TMedicine;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicines/medicine/update/${id}`, {
        method: "PATCH",
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

  deleteMedicine: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/medicines/medicine/delete/${id}`, {
        method: "DELETE",
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
};
