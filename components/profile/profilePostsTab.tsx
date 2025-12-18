"use client";

import React from "react";
import { TabsContent } from "../ui/tabs";
import { useFeedPostsByUserId } from "@/lib/hooks/useFeedPosts";
import FeedPost from "../feed/FeedPost";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import FeedPostSkeleton from "../feed/FeedLoading";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const ProfilePostsTab: React.FC<{ userId: string }> = ({ userId }) => {
  const { user } = useGetUserProfile();
  const { data: posts = [], isLoading } = useFeedPostsByUserId(userId);

  return (
    <TabsContent value="posts" className="space-y-4">
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">My Feed Posts</CardTitle>
          <CardDescription className="text-base">
            Activities you've shared to your feed
          </CardDescription>
        </CardHeader>
        {isLoading ? (
          <CardDescription className="p-3">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <FeedPostSkeleton key={i} />
              ))}
            </div>
          </CardDescription>
        ) : posts.length === 0 ? (
          <CardDescription className="p-3">
            <p className="col-span-2 py-8 text-center text-muted-foreground">
              You haven't posted any activities to your feed yet!
            </p>
          </CardDescription>
        ) : (
          <CardDescription className="space-y-6 p-3">
            {posts.map((post) => (
              <FeedPost key={post.id} user={user} post={post} />
            ))}
          </CardDescription>
        )}
      </Card>
    </TabsContent>
  );
};

export default ProfilePostsTab;
