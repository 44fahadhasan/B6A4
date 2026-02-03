"use client";

import useQueryParam from "@/hooks/use-query-param";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldLabel } from "../ui/field";

export default function CheckboxSearch({
  id,
  label,
  paramName,
  className,
  value,
}: {
  id: string;
  label: string;
  paramName: string;
  className?: string;
  value: string;
}) {
  const { paramValue, setParamValue } = useQueryParam(paramName);

  const toggle = (isChecked: boolean) => {
    if (isChecked) {
      setParamValue(value);
    } else {
      setParamValue("");
    }
  };

  return (
    <Field orientation="horizontal" className={cn(className)}>
      <Checkbox
        id={id}
        checked={paramValue === value}
        className="rounded-full"
        onCheckedChange={(v) => toggle(Boolean(v))}
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  );
}
