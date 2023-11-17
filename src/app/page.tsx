/** @format */
"use client";
import CommentInput from "@/components/CommentReplyInput";
import CommentThread, { Comment } from "@/components/CommentThread";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import data from "@/assets/data.json";
import CommentReplyInput from "@/components/CommentReplyInput";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/UseLocalStorage";

export default function Home() {
  const [animationParent] = useAutoAnimate();

  const [comments, setComments] = useState<Comment[]>(data.comments);

  // const [comments, setComments] = useLocalStorage<Comment[]>(
  //   "comments",
  //   data.comments,
  // );

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center  overflow-auto bg-gray-100 p-4 py-10">
      <section
        ref={animationParent}
        className="flex max-w-[658px] flex-col items-end gap-2"
      >
        {comments.map((d, i) => (
          <>
            <CommentThread
              setComments={setComments}
              comments={comments}
              key={i}
              userData={d}
              currentUser={data.currentUser}
            />
          </>
        ))}

        <CommentReplyInput
          setComments={setComments}
          comments={comments}
          commentType="add"
          currentUser={data.currentUser}
        />
      </section>
    </div>
  );
}
