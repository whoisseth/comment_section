import { cn } from "@/lib/utils";
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

type Props = {
  className?: string;
  score: number;
  onClickPlusBtn: () => void;
  onClickMinusBtn: () => void;
};

export function ScoreCard(props: Props) {
  return (
    <div
      className={cn(
        " flex    h-fit items-center gap-4 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-300 sm:flex-col sm:gap-2  sm:p-2 ",
        props.className,
      )}
    >
      <FaPlus
        onClick={props.onClickPlusBtn}
        className="cursor-pointer   hover:text-moderate-blue"
      />
      <p className=" text-base  text-moderate-blue">{props.score}</p>
      <FaMinus
        onClick={props.onClickMinusBtn}
        className="cursor-pointer   hover:text-moderate-blue"
      />
    </div>
  );
}
