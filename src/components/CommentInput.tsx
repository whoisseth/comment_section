import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { CommentBoxContainer } from "./CommentBoxContainer";

type Props = {
  className?: string;
};

export default function CommentInput(props: Props) {
  return (
    <CommentBoxContainer className={props.className}>
      <Image
        className="h-[30px] w-[30px] rounded-full"
        src={"https://i.pravatar.cc/150?img=12"}
        alt="pravatar image"
        height={30}
        width={30}
      />
      {/* <input type="text" /> */}
      <textarea className=" h-[100px]  w-full rounded-lg border-[1px] border-black p-2 outline-none transition-all focus:ring-1 focus:ring-slate-700 " />
      <Button>REPLY</Button>
    </CommentBoxContainer>
  );
}
