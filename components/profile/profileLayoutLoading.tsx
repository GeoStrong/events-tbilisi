"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ProfileLayoutLoading: React.FC = () => {
  return (
    <div className="mt-12 w-full px-5">
      {/* Tabs Skeleton */}
      <Skeleton className="h-10 w-48" />
      
      {/* Profile Header Card Skeleton - matches ProfileHeader structure */}
      <Card className="my-5 dark:border-slate-700 dark:bg-slate-800">
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Skeleton className="h-32 w-32 rounded-full" />
                {/* Camera button */}
                <Skeleton className="absolute bottom-0 right-0 h-10 w-10 rounded-full" />
              </div>
            </div>
            
            {/* User Info Section */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <Skeleton className="h-7 w-48" />
              
              {/* Stats (Activities, Followers, Following) */}
              <div className="flex w-full justify-center md:flex">
                <div className="md:w-1/2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-center">
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-1 text-center">
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-1 text-center">
                      <Skeleton className="h-6 w-8" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Email */}
              <Skeleton className="h-4 w-64" />
              
              {/* Bio */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              
              {/* Joined date */}
              <Skeleton className="h-4 w-48" />
              
              {/* Edit button */}
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Tabs Content Skeleton */}
      <div className="mb-4">
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Tab Content - Activities Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="dark:border-slate-700 dark:bg-slate-800">
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="px-6 pt-4">
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="px-6 pt-3 pb-4">
              <Skeleton className="h-4 w-32" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ProfileLayoutLoading;
