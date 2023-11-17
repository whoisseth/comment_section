import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVarients = cva("button", {
  variants: {
    intent: {
      primary:
        "bg-moderate-blue hover:bg-ligh-grayish-blue  text-white  min-w-[100px] max-w-[100px] h-10 rounded-md",
      icon: "flex cursor-pointer items-center",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVarients> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  className,
  icon,
  children,
  intent,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVarients({ intent, className }))}>
      {icon && <span className="ml-1">{icon} </span>}
      {children}
    </button>
  );
}
