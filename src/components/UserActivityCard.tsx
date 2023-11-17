import Image from "next/image";
import React from "react";
import { User } from "./CommentThread";

type UserActivityCardProps = {
  user: User;
  currentUser: User;
  createdAt: string;
};

export function UserActivityCard(props: UserActivityCardProps) {
  return (
    <div className="flex items-center gap-3 ">
      {/* user image */}
      <Image
        className="rounded-full"
        src={props.user.image.webp.substring(1)}
        alt="pravatar image"
        height={30}
        width={30}
      />
      {/* username  */}
      <p className=" text-sm font-semibold text-gray-700">
        {" "}
        {props.user.username}
      </p>
      {/* you */}
      {props.currentUser.username === props.user.username && (
        <p className="y-1 rounded-sm bg-moderate-blue px-2 text-sm text-white">
          you
        </p>
      )}
      {/* time */}
      <p className=" text-sm text-gray-500">{props.createdAt}</p>
    </div>
  );
}
