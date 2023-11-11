import { cn } from "@/lib/utils";
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

type Props = {};

export function ScoreCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        " flex    h-fit items-center gap-4 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-300 sm:flex-col sm:gap-2  sm:p-2 ",
        className,
      )}
    >
      <FaPlus className="hover:text-moderate-blue   cursor-pointer" />
      <p className=" text-moderate-blue  text-base">5</p>
      <FaMinus className="hover:text-moderate-blue   cursor-pointer" />
    </div>
  );
}
