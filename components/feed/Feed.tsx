"use client";

import React from "react";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import NotAuth from "../auth/notAuth";
import Spinner from "../general/spinner";
import UserAvatar from "../users/userAvatar";
import UsersRealtimeFollows from "../users/usersRealtimeFollows";
import Link from "next/link";
import { Button } from "../ui/button";

const Feed: React.FC = () => {
  const { user } = useGetUserProfile();

  if (user === undefined) return <NotAuth />;

  if (user === null) return <Spinner />;

  return (
    <div className="relative mt-6 grid w-full grid-cols-1 gap-3 md:grid-cols-5">
      <div className="sticky left-0 top-20 hidden flex-col items-center rounded-xl border p-4 shadow-md dark:bg-gray-900 md:flex">
        <UserAvatar avatarPath={user.avatar_path} size={20} />
        <h3 className="mt-5 font-bold">{user.name}</h3>
        <div className="w-full">
          <UsersRealtimeFollows userId={user.id} userName={user.name} />
        </div>
        <Button variant="outline">
          <Link href="/profile">Open Profile</Link>
        </Button>
      </div>
      <div className="overflow-y-auto rounded-xl border p-4 shadow-md dark:bg-gray-900 md:col-span-3 md:col-start-2">
        <h1 className="text-center text-3xl font-bold">For you</h1>
      </div>
      <div className="sticky right-0 top-20 hidden flex-col items-center rounded-xl border p-4 shadow-md dark:bg-gray-900 md:flex">
        <h3 className="text-center font-bold">Follow more Users</h3>
      </div>
    </div>
  );
};

export default Feed;
