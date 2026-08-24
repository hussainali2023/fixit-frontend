"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage = 1, totalPages = 1 }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  // 🟢 Always render pagination UI
  const total = totalPages || 1;

  return (
    <div className="flex items-center justify-center gap-3 pt-8 pb-4">
      {/* ⬅️ Previous Page Button */}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </Button>

      {/* 🟢 Page Indicator */}
      <span className="text-xs font-bold text-muted-foreground px-3.5 py-1.5 bg-accent rounded-xl border border-border">
        Page <span className="text-primary">{currentPage}</span> of {total}
      </span>

      {/* ➡️ Next Page Button */}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= total}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
      >
        Next <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}