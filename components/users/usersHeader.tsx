import { UserProfile } from "@/lib/types";
import React from "react";
import UserAvatar from "./userAvatar";
import { getActivitiesByUserId } from "@/lib/functions/supabaseFunctions";
import UserFollowButton from "../general/userFollowButton";
import UsersRealtimeFollows from "./usersRealtimeFollows";

const UsersHeader: React.FC<{ user: UserProfile }> = async ({ user }) => {
  const postedActivitiesNumber = (await getActivitiesByUserId(user.id)).length;

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between gap-5 md:items-center md:gap-10">
        <div className="w-1/4 md:w-auto">
          <UserAvatar avatarPath={user?.avatar_path} priority />
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/3">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-center">
              <p className="text-lg font-bold">{postedActivitiesNumber}</p>
              <p className="text-base">Activities</p>
            </div>
            <UsersRealtimeFollows userId={user.id} />
          </div>
        </div>
        <div className="hidden md:flex">
          <UserFollowButton userId={user.id} className="p-6 text-xl" />
        </div>
      </div>
      <div className="mt-4 w-full">
        <p className="text-base text-gray-500">
          Joined on{" "}
          {new Date(user.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-lg">{user.additionalInfo}</p>
        <div className="mt-4 flex w-full justify-center md:hidden">
          <UserFollowButton userId={user.id} className="w-2/3 py-6 text-xl" />
        </div>
      </div>
    </div>
  );
};
export default UsersHeader;
