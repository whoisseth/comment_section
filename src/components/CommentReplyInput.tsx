import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import { Button } from "./button";
import { CommentBoxContainer } from "./CommentBoxContainer";
import { Comment, User } from "./CommentThread";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type Props = {
  commentType?: "reply" | "add";
  className?: string;
  currentUser: User;
  replyingTo?: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setReplyBox?: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyInput?: React.Dispatch<React.SetStateAction<string>>;
  replyInput?: string;
  handleAddComment?: () => void;
};

export default function CommentReplyInput(props: Props) {
  // useState to handel texarea
  // const { replyInput, setReplyInput } = props;
  const [replyInput, setReplyInput] = useState("");

  function handleReply() {
    // add replyInput to comments
    if (replyInput.length > 0) {
      const inputDate = new Date();
      props.setComments([
        ...props.comments,
        {
          id: Math.random(),
          content: replyInput,
          createdAt: formatDistanceToNow(inputDate, { addSuffix: true }),
          score: 0,
          user: props.currentUser,
        },
      ]);
      // clear textarea
      setReplyInput("");
    }
  }

  return (
    <CommentBoxContainer
      className={cn(" flex-col sm:flex-row", props.className)}
    >
      <Image
        className="hidden h-[30px] w-[30px] rounded-full sm:block"
        src={props?.currentUser?.image?.png.substring(1)}
        // src={"/images/avatars/image-juliusomo.webp"}
        alt="pravatar image"
        height={30}
        width={30}
      />
      {/* <input type="text" /> */}
      <textarea
        onChange={(e) =>
          props.commentType === "add"
            ? setReplyInput(e.target.value)
            : props.setReplyInput && props.setReplyInput(e.target.value)
        }
        // value={props.replyingTo ? `@${props.replyingTo} ${replyInput}` : ""}
        value={props.commentType === "add" ? replyInput : props.replyInput}
        className=" h-[100px]  w-full rounded-lg border-2 border-gray-100 p-2 outline-none transition-all focus:ring-1 focus:ring-slate-700 "
      />
      <Button
        onClick={
          props.commentType === "add" ? handleReply : props.handleAddComment
        }
        className="hidden sm:block"
      >
        {props.commentType === "reply" ? "REPLY" : "SEND"}
      </Button>
      {/* mobile view */}
      <div className=" flex justify-between gap-2 sm:hidden">
        <Image
          className="h-[30px] w-[30px] rounded-full"
          src={props?.currentUser?.image?.png.substring(1)}
          // src={"/images/avatars/image-juliusomo.webp"}
          alt="pravatar image"
          height={30}
          width={30}
        />
        <Button
          onClick={
            props.commentType === "add" ? handleReply : props.handleAddComment
          }
        >
          {props.commentType === "reply" ? "REPLY" : "SEND"}
        </Button>
      </div>
    </CommentBoxContainer>
  );
}
