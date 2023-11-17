import { cn } from "@/lib/utils";
import React, { TextareaHTMLAttributes } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // setInputValue?: (value: string) => void;
  // inputValue?: string;
}

export default function Textarea(props: Props) {
  return (
    <textarea
      {...props}
      className={cn(
        " h-[100px]  w-full rounded-lg border-2 border-gray-100 p-2 outline-none transition-all focus:ring-1 focus:ring-slate-700 ",
        props.className,
      )}
    />
  );
}
