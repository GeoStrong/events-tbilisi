"use client";

import {
  getActivityReactions,
  getUserReaction,
  toggleActivityReaction,
} from "@/lib/functions/supabaseFunctions";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import React, { useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

const ActivityEngagement: React.FC<{
  activityId: string;
  activityLikes: number;
  activityDislikes: number;
}> = ({ activityId, activityLikes, activityDislikes }) => {
  const [likes, setLikes] = useState<number>(activityLikes);
  const [dislikes, setDislikes] = useState<number>(activityDislikes);
  const { user } = useGetUserProfile();
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;

    const loadReaction = async () => {
      const reaction = await getUserReaction(activityId, user.id);
      setUserReaction(reaction);
    };

    loadReaction();
  }, [activityId, user]);

  const handleReaction = async (reaction: "like" | "dislike") => {
    await toggleActivityReaction(activityId, reaction, user!.id);

    const updated = await getActivityReactions(activityId);

    setLikes(updated.likes);
    setDislikes(updated.dislikes);

    if (userReaction === reaction) {
      setUserReaction(null);
    } else {
      setUserReaction(reaction);
    }
  };

  return (
    <>
      <button
        className={`flex items-center gap-2 ${
          userReaction === "like" ? "text-blue-500" : ""
        }`}
        onClick={() => handleReaction("like")}
      >
        <AiFillLike className="text-lg md:text-2xl" />
        <span>{likes}</span>
      </button>

      <button
        className={`flex items-center gap-2 ${
          userReaction === "dislike" ? "text-red-500" : ""
        }`}
        onClick={() => handleReaction("dislike")}
      >
        <AiFillDislike className="text-lg md:text-2xl" />
        <span>{dislikes}</span>
      </button>
    </>
  );
};
export default ActivityEngagement;
