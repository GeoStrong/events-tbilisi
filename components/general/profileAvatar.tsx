import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { BiUser } from "react-icons/bi";

const ProfileAvatar: React.FC<{ image?: string }> = ({ image }) => {
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
          <div className="rounded-full border-2 border-gray-300 bg-gray-100 p-2 dark:border-gray-900 dark:bg-gray-800">
            <BiUser className="dark:text-white" />
          </div>
        )}
      </Avatar>
    </>
  );
};
export default ProfileAvatar;
