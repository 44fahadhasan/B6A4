"use server";

import { env } from "@/env";
import { ISellerSingup } from "@/types";

const API_URL = env.BACKEND_API_URL;

export const singupSellerAccount = async (
  payload: ISellerSingup,
): Promise<{
  data: any;
  message: string;
  success: boolean;
}> => {
  try {
    const res = await fetch(`${API_URL}/seller/sing-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const result = await res.json();

    if (!result.success) {
      return {
        data: null,
        message: result.message,
        success: result.success,
      };
    }

    return result;
  } catch (error) {
    return {
      data: null,
      message: (error as Error).message,
      success: false,
    };
  }
};
