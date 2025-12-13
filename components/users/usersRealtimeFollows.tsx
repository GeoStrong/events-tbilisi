"use client";
import { fetchAllFollowersByUserId } from "@/lib/profile/profile";
import { RootState } from "@/lib/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UsersRealtimeFollows: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const [followers, setFollowers] = useState<number>(0);
  const [followings] = useState<number>(0);
  const { lastChangedUserId, lastChangedAt } = useSelector(
    (state: RootState) => state.follower,
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      const userFollowers = await fetchAllFollowersByUserId(userId);
      if (!mounted) return;
      setFollowers(Math.max(0, userFollowers.length));
    })();
    return () => {
      mounted = false;
    };
  }, [userId]);

  useEffect(() => {
    if (!lastChangedAt) return;
    if (lastChangedUserId !== userId) return;

    let mounted = true;
    (async () => {
      const userFollowers = await fetchAllFollowersByUserId(userId);
      if (!mounted) return;
      setFollowers(Math.max(0, userFollowers.length));
    })();

    return () => {
      mounted = false;
    };
  }, [lastChangedAt, lastChangedUserId, userId]);

  //   useEffect(() => {
  //     const channel = supabase
  //       .channel("realtime follows")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "INSERT",
  //           schema: "public",
  //           table: "followers",
  //         },
  //         () => {
  //           setFollowers(userFollowers + 1);
  //         },
  //       )
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "DELETE",
  //           schema: "public",
  //           table: "followers",
  //         },
  //         () => {
  //           setFollowers(userFollowers - 1);
  //         },
  //       )
  //       .subscribe();

  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [supabase]);

  return (
    <>
      <div className="space-y-1 text-center">
        <p className="text-lg font-bold">{followers}</p>
        <p className="text-base">Followers</p>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-lg font-bold">{followings}</p>
        <p className="text-base">Following</p>
      </div>
    </>
  );
};
export default UsersRealtimeFollows;
