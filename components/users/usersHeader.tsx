import { UserProfile } from "@/lib/types";
import Image from "next/image";
import React from "react";
import defaultUserImg from "@/public/images/default-user.png";
import { getImageUrl } from "@/lib/functions/supabaseFunctions";
import { Button } from "../ui/button";

const UsersHeader: React.FC<{ user: UserProfile }> = async ({ user }) => {
  // const [profileImg, setProfileImg]
  const profileImg =
    (user?.avatar_path && (await getImageUrl(user?.avatar_path))) ||
    defaultUserImg.src;

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between gap-5 md:items-center md:gap-10">
        <div className="w-1/4 md:w-auto">
          <Image
            src={profileImg}
            width={50}
            height={50}
            alt="profile"
            className="h-16 w-16 rounded-full object-cover object-center md:h-44 md:w-44"
            unoptimized={true}
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/3">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-center">
              <p className="text-lg font-bold">5</p>
              <p className="text-base">Activities</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-lg font-bold">50</p>
              <p className="text-base">Followers</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-lg font-bold">150</p>
              <p className="text-base">Following</p>
            </div>
          </div>
        </div>
        <Button className="hidden p-6 text-xl md:block">Follow</Button>
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
          <Button className="w-2/3 py-6 text-xl">Follow</Button>
        </div>
      </div>
    </div>
  );
};
export default UsersHeader;
