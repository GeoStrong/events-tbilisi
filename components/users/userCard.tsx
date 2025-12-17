"use client";

import Link from "next/link";
import React from "react";
import UserAvatar from "./userAvatar";
import UserFollowButton from "../general/userFollowButton";
import { useUser } from "@/lib/hooks/useUser";

const UserCard: React.FC<{
  userId: string;
  children?: React.ReactNode;
}> = ({ userId, children }) => {
  const { data: activeUser } = useUser(userId);

  return (
    <>
      <div className="mb-4 flex items-center justify-between border-b pb-3 dark:border-b-gray-600">
        <Link
          className="flex items-center gap-4"
          href={userId ? `/users/${userId}` : "#"}
        >
          <UserAvatar avatarPath={activeUser?.avatar_path || ""} size={8} />
          <p className="">{activeUser?.name}</p>
        </Link>
        <div className="flex items-center gap-3">
          {userId && <UserFollowButton userId={userId} />}
          {children}
        </div>
      </div>
    </>
  );
};
export default UserCard;
