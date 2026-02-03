"use client";

import useQueryParam from "@/hooks/use-query-param";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import SelectSearch from "./select-search";

export default function Pagination({
  meta,
}: {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}) {
  const { setParamValue } = useQueryParam("page");

  const { total: totalItems, page: currentPage, limit } = meta;

  const totalPage = Math.max(1, Math.ceil(totalItems / limit));

  const end = Math.min(currentPage * limit, totalItems);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;

  const navigateToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPage));
    setParamValue(`${newPage}`);
  };

  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm md:flex">
        Showing {start} to {end} of {totalItems} results
      </div>
      <div className="flex w-full items-center gap-8 md:w-fit">
        <div className="hidden items-center gap-2 md:flex">
          <SelectSearch
            paramName="limit"
            placeholder="12"
            id="rows-per-page"
            label="Rows per page"
            listItems={[12, 20, 30, 40, 50]}
          />
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPage}
        </div>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => navigateToPage(1)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-8"
            disabled={currentPage === 1}
            onClick={() => navigateToPage(currentPage - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="size-8"
            disabled={currentPage === totalPage}
            onClick={() => navigateToPage(currentPage + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="hidden size-8 md:flex"
            onClick={() => navigateToPage(totalPage)}
            disabled={currentPage === totalPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
