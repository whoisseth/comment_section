import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CommentBoxContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "flex w-full  max-w-[658px] gap-4 rounded-lg bg-white p-5  ",
        className,
      )}
    >
      {children}
    </div>
  );
}
