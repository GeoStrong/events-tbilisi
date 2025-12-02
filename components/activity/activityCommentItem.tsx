import { BiDotsVerticalRounded } from "react-icons/bi";
import { CommentEntity, UserProfile } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultUserImg from "@/public/images/default-user.png";
import { getImageUrl } from "@/lib/functions/supabaseFunctions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActivityCommentItemProps {
  user: UserProfile;
  comment: CommentEntity;
  isReply?: boolean;
}

const ActivityCommentItem: React.FC<ActivityCommentItemProps> = ({
  user,
  comment,
  isReply,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const image = await getImageUrl(user?.avatar_path || "");
      setAvatarUrl(image || "");
    })();
  }, [user]);

  return (
    <div className="flex items-start gap-3">
      <Image
        src={avatarUrl || defaultUserImg.src}
        width={isReply ? 18 : 20}
        height={isReply ? 18 : 20}
        className={`${isReply ? "h-7 w-7" : "h-8 w-8"} rounded-full object-cover`}
        alt="profile"
      />

      <div className="w-[90%] rounded-md text-left md:w-[90%]">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <h4
              className={`text-base ${isReply ? "font-semibold" : "font-bold"}`}
            >
              {comment.user?.name}
            </h4>

            <p className="text-base">{comment.text}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiDotsVerticalRounded />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-700">
              <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="mt-1 text-base text-gray-600 dark:text-gray-400">
          Reply
        </button>
      </div>
    </div>
  );
};

export default ActivityCommentItem;
