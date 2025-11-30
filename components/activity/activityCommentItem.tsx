import { CommentNode, UserProfile } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultUserImg from "@/public/images/default-user.png";
import { getImageUrl } from "@/lib/functions/supabaseFunctions";

const ActivityCommentItem: React.FC<{
  comment: CommentNode;
  level?: number;
  user: UserProfile;
}> = ({ comment, level = 0, user }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const image = await getImageUrl(user?.avatar_path || "");
      setAvatarUrl(image || "");
    })();
  }, [user]);

  return (
    <div className="relative mt-4">
      {/* Line connecting child to parent */}
      {level > 0 && (
        <div className="absolute -left-6 top-3 h-full border-l border-gray-300"></div>
      )}

      {/* Arrow pointing to child bubble */}
      {level > 0 && (
        <div className="absolute -left-2 top-4 h-0 w-0 border-y-8 border-r-8 border-y-transparent border-r-gray-300"></div>
      )}

      <div className="flex items-start gap-3">
        <Image
          src={avatarUrl || defaultUserImg.src}
          width={20}
          height={20}
          className="h-8 w-8 rounded-full object-cover"
          alt="profile"
        />

        <div className="w-3/4 rounded-xl bg-gray-50 p-3 text-left">
          <h4 className="text-sm font-bold">{comment.user?.name}</h4>
          <p className="text-sm font-extralight">{comment.text}</p>
          <button className="mt-1 text-sm text-gray-600">Reply</button>
        </div>
      </div>

      {/* Replies section */}
      {comment.replies?.length > 0 && (
        <div className="ml-10">
          {comment.replies.map((child) => (
            <ActivityCommentItem
              key={child.id}
              comment={child}
              level={level + 1}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityCommentItem;
