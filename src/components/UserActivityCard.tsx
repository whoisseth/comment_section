import Image from "next/image";
import React from "react";

type UserActivityCardProps = {
  username: string;
  currentUser: boolean;
  timeAgo: string;
};

export function UserActivityCard(props: UserActivityCardProps) {
  return (
    <div className="flex items-center gap-3 ">
      {/* user image */}
      <Image
        className="rounded-full"
        src={"https://i.pravatar.cc/150?img=12"}
        alt="pravatar image"
        height={30}
        width={30}
      />
      {/* username  */}
      <p className=" text-sm font-semibold text-gray-700"> amyrobson</p>
      {/* you */}
      {props.currentUser && (
        <p className="y-1 bg-moderate-blue rounded-sm px-2 text-sm text-white">
          you
        </p>
      )}
      {/* time */}
      <p className=" text-sm text-gray-500">1 month ago</p>
    </div>
  );
}
