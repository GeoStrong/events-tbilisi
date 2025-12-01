import { CommentEntity, UserProfile } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultUserImg from "@/public/images/default-user.png";
import { getImageUrl } from "@/lib/functions/supabaseFunctions";

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

      <div className="w-3/4 rounded-md text-left">
        <h4 className={`text-sm ${isReply ? "font-semibold" : "font-bold"}`}>
          {comment.user?.name}
        </h4>

        <p className="text-sm">{comment.text}</p>

        <button className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Reply
        </button>
      </div>
    </div>
  );
};

export default ActivityCommentItem;
