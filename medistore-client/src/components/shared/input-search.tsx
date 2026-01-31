"use client";

import useDebounce from "@/hooks/use-debounce";
import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function InputSearch({
  name,
  className,
  placeholder,
}: {
  name: string;
  className?: string;
  placeholder?: string;
}) {
  const { paramValue, setParamValue } = useQueryParam(name);

  const [search, setSearch] = useState(paramValue);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setParamValue(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Input
      value={search}
      placeholder={placeholder}
      className={cn("min-w-fit max-w-sm", className)}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
