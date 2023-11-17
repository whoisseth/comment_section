/** @format */
"use client";

import React, { SetStateAction, useState } from "react";
import { FaReply } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserActivityCard } from "./UserActivityCard";
import { ScoreCard } from "./ScoreCard";
import { CommentBoxContainer } from "./CommentBoxContainer";
import { Button } from "./button";
import { AiFillDelete } from "react-icons/ai";
import { PiPencilSimpleFill } from "react-icons/pi";
import CommentReplyInput from "./CommentReplyInput";
import { useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDistanceToNow, set } from "date-fns";
import Textarea from "./Textarea";

type Image = {
  png: string;
  webp: string;
};

export type User = {
  image: Image;
  username: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
};

type CommentData = {
  currentUser: User;
  userData: Comment;
};

interface CommenteThredType extends CommentData {
  className?: string;
  comments: Comment[];
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  handleDelte?: () => void;
  handleEditRepliedComment?: () => void;
  // handleReply: () => void;

  // repliedComment:
}

export default function CommentThread(props: CommenteThredType) {
  const [animationParent] = useAutoAnimate();
  const [replyInput, setReplyInput] = React.useState("@username");
  const [isEditBoxOpen, setEditBox] = React.useState(false);
  const [isReplyBoxOpen, setReplyBox] = useState(false);

  const defaultValue = props.userData.replyingTo
    ? `@${props.userData.replyingTo} ${props.userData.content}`
    : props.userData.content;

  const [inputValue, setInputValue] = useState(defaultValue);

  function toggleReplyBox() {
    setReplyBox(!isReplyBoxOpen);
  }
  function toggleEditBox() {
    setEditBox(!isEditBoxOpen);
    if (isEditBoxOpen) {
      setInputValue(props.userData.content);
    }
  }

  function handleReply() {
    if (replyInput.length > 0) {
      const inputDate = new Date();
      const newReply: Comment = {
        id: Math.random(), // Generate a unique ID for the reply
        content: replyInput,
        createdAt: formatDistanceToNow(inputDate, { addSuffix: true }),
        score: 0, // Assuming a default score for a new reply
        user: props.currentUser,
        replyingTo: props.userData.user.username, // Set the username of the user who is replying
        replies: [], // Nested replies will start as an empty array
      };

      const updatedComments = updateReplies(
        props.comments,
        props.userData.id,
        newReply,
      );

      props?.setComments && props?.setComments(updatedComments);
      setReplyInput(""); // Clear textarea
      setReplyBox(false);
    }
  }

  // Function to recursively update replies within comments
  function updateReplies(
    comments: Comment[],
    parentId: number,
    newReply: Comment,
  ): Comment[] {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        // If the comment matches the one we're replying to
        return {
          ...comment,
          replies: comment.replies
            ? [...comment.replies, newReply]
            : [newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        // If it's not the matching comment, check its replies
        return {
          ...comment,
          replies: updateReplies(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  }

  // Function to delete a comment
  function deleteComment(commentId: number) {
    const updatedComments = props.comments.filter(
      (comment) => comment.id !== commentId,
    );
    props?.setComments && props?.setComments(updatedComments);
  }

  // Function to handle deleting replied comments
  function handleDeleteRepliedComment(
    commentId: number,
    parentId: number,
  ): void {
    const updatedComments = deleteRepliedComment(
      props.comments,
      parentId,
      commentId,
    );
    props.setComments(updatedComments);
  }

  // Function to recursively delete a replied comment from the comments array
  function deleteRepliedComment(
    comments: Comment[],
    parentId: number,
    targetId: number,
  ): Comment[] {
    return comments.map((comment) => {
      if (comment.id === parentId && comment.replies) {
        comment.replies = comment.replies.filter(
          (reply) => reply.id !== targetId,
        );
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteRepliedComment(
          comment.replies,
          parentId,
          targetId,
        );
      }
      return comment;
    });
  }

  // Funtion to handleEdit

  function handleEdit() {
    // createdAt: formatDistanceToNow(inputDate, { addSuffix: true }),
    if (inputValue.trim().length > 0) {
      const inputDate = new Date();
      const updatedComments = props.comments.map((comment) => {
        if (comment.id === props.userData.id) {
          return {
            ...comment,
            content: inputValue,
            createdAt: formatDistanceToNow(inputDate, { addSuffix: true }),
            // Update any other properties if needed
          };
        }
        return comment;
      });

      props.setComments(updatedComments);
      setInputValue(inputValue); // Update the input value if needed
      setEditBox(false); // Close the edit box
    }
  }

  // Function to handleEdit for replied comments
  function handleEditRepliedComment(replyId: number) {
    const updatedComments = props.comments.map((comment) => {
      if (comment.id === props.userData.id) {
        // If it's the main comment
        if (comment.replies && comment.replies.length > 0) {
          // If it has replies
          comment.replies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              // If it's the replied comment to edit
              return {
                ...reply,
                content: inputValue, // Update the content
                // Update any other properties if needed
              };
            }
            return reply;
          });
        }
      }
      return comment;
    });

    // Update the state with the edited comments
    props.setComments([...updatedComments]);
    setEditBox(false); // Close the edit box
  }

  return (
    // <div className="felx gap-2">
    <>
      <CommentBoxContainer className={cn(props.className)}>
        {/* score */}
        <ScoreCard
          score={props.userData.score}
          onClickMinusBtn={() => null}
          onClickPlusBtn={() => null}
          className="hidden  transition-all sm:flex"
        />
        {/* comment details */}
        <section ref={animationParent} className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between  gap-5">
            {/*  */}
            <UserActivityCard
              currentUser={props.currentUser}
              createdAt={props.userData.createdAt}
              user={props.userData.user}
            />
            {/* reply */}

            {props.currentUser.username === props.userData.user.username ? (
              <div className="hidden items-center gap-2 sm:flex  ">
                <Button
                  onClick={() =>
                    props.handleDelte
                      ? props.handleDelte()
                      : deleteComment(props.userData.id)
                  }
                  // onClick={() => handleDeleteRepliedComment(props.userData.id,props.currentUser.)}
                  intent="icon"
                  className=" text-red-400 hover:text-red-300"
                >
                  <AiFillDelete className="mr-2 text-lg" /> Delete
                </Button>
                <Button
                  onClick={toggleEditBox}
                  intent="icon"
                  className=" text-moderate-blue hover:text-ligh-grayish-blue"
                >
                  <PiPencilSimpleFill className="mr-2" /> Edit
                </Button>
              </div>
            ) : (
              <Button
                onClick={toggleReplyBox}
                intent="icon"
                className=" hidden text-moderate-blue hover:text-ligh-grayish-blue sm:flex"
              >
                <FaReply className="mr-2" /> Reply
              </Button>
            )}
          </div>
          {/* content */}

          {isEditBoxOpen ? (
            <>
              {/* {props.userData.replyingTo ? (
                <Textarea
                  // value={`@${props.userData.replyingTo}`}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              ) : (
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )} */}
              {props.userData.replyingTo}
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </>
          ) : (
            <p className=" w-full text-gray-500 ">
              {/* replyingTo   */}

              {props.userData.replyingTo && (
                <span className="mr-1 font-semibold text-moderate-blue">
                  @{props.userData.replyingTo}
                </span>
              )}
              <span>{props.userData.content}</span>
            </p>
          )}
          {/* mobile score button  and reply button */}
          <div className="flex  items-center justify-between gap-2 transition-all sm:hidden">
            <ScoreCard
              onClickMinusBtn={() => null}
              onClickPlusBtn={() => null}
              score={props.userData.score}
            />
            <div>
              {/* props.currentUser.username === props.user.username */}
              {props.currentUser.username === props.userData?.user?.username ? (
                <div className="flex items-center gap-2 sm:hidden">
                  <Button
                    onClick={() => deleteComment(props.userData.id)}
                    intent="icon"
                    className=" text-red-400 hover:text-red-300"
                  >
                    <AiFillDelete className="mr-2 text-lg" /> Delete
                  </Button>
                  <Button
                    onClick={toggleEditBox}
                    intent="icon"
                    className=" text-moderate-blue hover:text-ligh-grayish-blue"
                  >
                    <PiPencilSimpleFill className="mr-2" /> Edit
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={toggleReplyBox}
                  intent="icon"
                  className=" text-moderate-blue hover:text-ligh-grayish-blue"
                >
                  <FaReply className="mr-2" /> Reply
                </Button>
              )}
            </div>
          </div>
          {isEditBoxOpen && (
            <div className="flex w-full justify-end">
              <Button onClick={handleEdit} className="justify-end ">
                UPDATE
              </Button>
            </div>
          )}
          {/* Update Button */}
        </section>
      </CommentBoxContainer>
      {/* reply input box */}
      {isReplyBoxOpen && (
        <CommentReplyInput
          replyInput={replyInput}
          setReplyInput={setReplyInput}
          setReplyBox={setReplyBox}
          setComments={props.setComments}
          comments={props.comments}
          replyingTo={props.userData.user.username}
          commentType="reply"
          handleAddComment={handleReply}
          currentUser={props.currentUser}
        />
      )}
      {Array.isArray(props.userData.replies) &&
      props.userData.replies.length > 0 ? (
        <div
          ref={animationParent}
          className={cn(
            "my-2 flex w-full  flex-col  items-end  gap-2      ",
            props.userData.replyingTo === undefined &&
              " border-l-2 pl-4 sm:ml-8   sm:pl-9",
          )}
        >
          {props.userData.replies?.map((replyUserData, replyIndex) => (
            <>
              <CommentThread
                handleEditRepliedComment={() =>
                  handleEditRepliedComment(replyUserData.id)
                }
                handleDelte={() =>
                  handleDeleteRepliedComment(
                    replyUserData.id,
                    props.userData.id,
                  )
                }
                // handleReply={() => null}
                setComments={props.setComments}
                comments={props.comments}
                key={replyIndex}
                className="ml-4"
                userData={replyUserData}
                currentUser={props.currentUser}
              />
            </>
          ))}
        </div>
      ) : null}
    </>
    // </div>
  );
}
