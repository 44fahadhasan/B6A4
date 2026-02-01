"use client";

import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectSearch({
  id,
  label,
  paramName,
  listItems,
  className,
  placeholder,
}: {
  id: string;
  label: string;
  paramName: string;
  className?: string;
  placeholder: string;
  listItems: (string | number)[];
}) {
  const { paramValue, setParamValue } = useQueryParam(paramName);

  return (
    <>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Select
        value={paramValue}
        onValueChange={(value) => setParamValue(value)}
      >
        <SelectTrigger size="sm" className={cn("w-20", className)} id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent side="top">
          {listItems.map((item) => (
            <SelectItem key={item} value={`${item}`}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
