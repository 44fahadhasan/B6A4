"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useDebounce from "@/hooks/use-debounce";
import useQueryParam from "@/hooks/use-query-param";
import { useCallback, useEffect, useState } from "react";

export default function RangeSearch({
  label = "Price Range",
  min = 0,
  max = 1000,
  step = 10,
}: {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const { paramValue: minPriceParam, setParamValue: setMin } =
    useQueryParam("minPrice");
  const { paramValue: maxPriceParam, setParamValue: setMax } =
    useQueryParam("maxPrice");

  const parseNumber = (val: string | undefined, fallback: number) =>
    val !== undefined && val !== "" ? Number(val) : fallback;

  const initialFrom = parseNumber(minPriceParam, min);
  const initialTo = parseNumber(maxPriceParam, max);

  const [value, setValue] = useState<[number, number]>([
    initialFrom,
    initialTo,
  ]);

  useEffect(() => {
    const newFrom = parseNumber(minPriceParam, min);
    const newTo = parseNumber(maxPriceParam, max);

    if (newFrom !== value[0] || newTo !== value[1]) {
      setValue([newFrom, newTo]);
    }
  }, [minPriceParam, maxPriceParam, min, max]);

  const debouncedValue = useDebounce(value);

  // Update URL params when slider stops moving
  useEffect(() => {
    const [newFrom, newTo] = debouncedValue;

    if (newFrom !== parseNumber(minPriceParam, min)) setMin(String(newFrom));
    if (newTo !== parseNumber(maxPriceParam, max)) setMax(String(newTo));
  }, [debouncedValue, setMin, setMax, minPriceParam, maxPriceParam, min, max]);

  const handleChange = useCallback((val: number[]) => {
    setValue(val as [number, number]);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <Label>{label}</Label>
        <span className="text-muted-foreground">
          ৳{value[0]} – ৳{value[1]}
        </span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
      />
    </div>
  );
}
