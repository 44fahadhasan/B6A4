import { env } from "@/env";
import { TPharmacie } from "@/form-schemas/pharmacie-form.schema";
import { IPaginationOptions, IQueryParams } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_API_URL;

export type TPharmacieParams = IPaginationOptions & IQueryParams;

export const pharmaciesService = {
  getPharmaciesForAdmin: async function (params?: TPharmacieParams) {
    try {
      const url = new URL(`${API_URL}/pharmacies/admin`);
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
        next: { tags: ["pharmacies"] },
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

  getPharmaciesForSeller: async function (params?: TPharmacieParams) {
    try {
      const url = new URL(`${API_URL}/pharmacies/seller`);
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
        next: { tags: ["pharmacies"] },
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

  createPharmacie: async function (payload: TPharmacie) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/pharmacies/pharmacie/create`, {
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

  updatePharmacie: async function ({
    id,
    payload,
  }: {
    id: string;
    payload: TPharmacie;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/pharmacies/pharmacie/update/${id}`, {
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

  deletePharmacie: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/pharmacies/pharmacie/delete/${id}`, {
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
