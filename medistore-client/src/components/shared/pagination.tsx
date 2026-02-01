"use client";

import { IPaginationOptions } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import SelectSearch from "./select-search";

export default function Pagination({ params }: { params: IPaginationOptions }) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        0 of 68 row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <SelectSearch
            paramName="limit"
            placeholder="12"
            id="rows-per-page"
            label="Rows per page"
            listItems={[12, 20, 30, 40, 50]}
          />
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page 0 of 10
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" className="size-8" size="icon">
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button variant="outline" className="size-8" size="icon">
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="hidden size-8 lg:flex"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
