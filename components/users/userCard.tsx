"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserAvatar from "./userAvatar";
import UserFollowButton from "../general/userFollowButton";
import { fetchUserInfo } from "@/lib/profile/profile";
import { UserProfile } from "@/lib/types";

const UserCard: React.FC<{
  userId: string;
  children?: React.ReactNode;
}> = ({ userId, children }) => {
  const [activeUser, setActiveUser] =
    useState<Partial<UserProfile | null>>(null);

  useEffect(() => {
    (async () => {
      const user = await fetchUserInfo(userId);
      setActiveUser(user);
    })();
  }, [userId]);

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
