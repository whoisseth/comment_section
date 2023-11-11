/** @format */

import React from "react";
import { FaPlus, FaMinus, FaReply } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserActivityCard } from "./UserActivityCard";
import { ScoreCard } from "./ScoreCard";
import { CommentBoxContainer } from "./CommentBoxContainer";

type Image = {
  png: string;
  webp: string;
};

type User = {
  image: Image;
  username: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
};

type CommentData = {
  currentUser: User;
  comments: Comment[];
};

interface CommenteThredType extends CommentData {
  className?: string;
}

export default function CommentThread(props: CommenteThredType) {
  return (
    <CommentBoxContainer className={props.className}>
      {/* score */}
      <ScoreCard className="hidden  transition-all sm:flex" />
      {/* comment details */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-5 ">
          {/*  */}
          <UserActivityCard />
          {/* reply */}
          <ReplyBtn className="hidden  transition-all sm:flex" />
        </div>
        {/* content */}
        <p className=" w-full text-gray-500">
          {/* replyingTo   */}
          <span className="text-moderate-blue font-semibold">@maxblagun</span>
          <span>
            {` Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.`}
          </span>
        </p>
        {/* mobile score button  and reply button */}
        <div className="flex  items-center justify-between gap-2 transition-all sm:hidden">
          <ScoreCard />
          <ReplyBtn />
        </div>
      </section>
    </CommentBoxContainer>
  );
}

function ReplyBtn({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-moderate-blue  hover:text-ligh-grayish-blue flex cursor-pointer items-center  gap-1",
        className,
      )}
    >
      {/* reply img  */}
      <FaReply />
      <p>Reply</p>
    </div>
  );
}
