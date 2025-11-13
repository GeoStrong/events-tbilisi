"use client";

import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { useLocation } from "react-use";
import Image from "next/image";
import defaultUserImg from "@/public/images/default-user.png";

const ProfileAvatar: React.FC<{ image?: string }> = ({ image }) => {
  const { pathname } = useLocation();

  const activeProfile = pathname === "/profile";
  return (
    <>
      {" "}
      <Avatar>
        {image ? (
          <AvatarImage
            className="h-10 w-10 rounded-full"
            src={image}
            alt="profile"
          />
        ) : (
          <div>
            <Image
              src={defaultUserImg.src}
              alt="user"
              width={20}
              height={20}
              className={`h-10 w-10 rounded-full border-2 border-gray-300 bg-gray-100 object-cover dark:border-gray-900 dark:bg-gray-800 ${activeProfile && "border-primary"}`}
            />
          </div>
        )}
      </Avatar>
    </>
  );
};
export default ProfileAvatar;
