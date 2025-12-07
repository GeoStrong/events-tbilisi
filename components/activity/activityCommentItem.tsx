import { BiDotsVerticalRounded } from "react-icons/bi";
import { CommentEntity, UserProfile } from "@/lib/types";
import React, { useEffect, useState } from "react";
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
import { fetchUserInfo } from "@/lib/profile/profile";

interface ActivityCommentItemProps {
  comment: CommentEntity;
  isReply?: boolean;
  onRequestEdit?: (commentId: string, text: string) => void;
  onRequestDelete?: (commentId: string) => void;
  onReplyTo?: (commentId: string, username?: string) => void;
  onEdit?: (commentId: string, newText: string) => Promise<void>;
  onDelete?: (commentId: string) => Promise<void>;
}

const ActivityCommentItem: React.FC<ActivityCommentItemProps> = ({
  comment,
  isReply,
  onRequestEdit,
  onRequestDelete,
  onReplyTo,
  onEdit,
  onDelete,
}) => {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);

  useEffect(() => {
    (async () => {
      const profile = await fetchUserInfo(comment.user_id);
      setProfile(profile);
    })();
  }, [comment.user_id]);

  const { imageUrl: avatarUrl } = useOptimizedImage(
    profile?.avatar_path || "",
    {
      quality: 50,
      width: 18,
      height: 18,
      fallback: defaultUserImg.src,
    },
  );

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
              {profile?.name || "User"}
            </h4>

            <p className="text-base">{comment.text}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BiDotsVerticalRounded />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-700">
              <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (onRequestEdit) onRequestEdit(comment.id, comment.text);
                  if (onEdit) onEdit(comment.id, comment.text);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (onRequestDelete) onRequestDelete(comment.id);
                  if (onDelete) onDelete(comment.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="mt-1 text-base text-gray-600 dark:text-gray-400"
          onClick={() => onReplyTo && onReplyTo(comment.id, profile?.name)}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default ActivityCommentItem;
