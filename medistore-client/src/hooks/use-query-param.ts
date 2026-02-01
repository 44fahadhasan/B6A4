"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function useQueryParam(name: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramValue = searchParams.get(name) || "";

  const setParamValue = (newParamValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newParamValue) {
      params.set(name, newParamValue);
    } else {
      params.delete(name);
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { paramValue, setParamValue };
}
