import { BiDotsVerticalRounded } from "react-icons/bi";
import { CommentEntity, UserProfile } from "@/lib/types";
import React from "react";
import defaultUserImg from "@/public/images/default-user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useOptimizedImage from "@/lib/hooks/useOptimizedImage";
import OptimizedImage from "../ui/optimizedImage";

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
  const { imageUrl: avatarUrl } = useOptimizedImage(user?.avatar_path || "", {
    quality: 50,
    width: 18,
    height: 18,
    fallback: defaultUserImg.src,
  });

  return (
    <div className="flex items-start gap-3">
      <OptimizedImage
        src={avatarUrl}
        quality={50}
        width={18}
        height={18}
        alt="profile"
        priority={false}
        objectFit="cover"
        containerClassName={`${isReply ? "h-7 w-7" : "h-8 w-8"} rounded-full`}
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
