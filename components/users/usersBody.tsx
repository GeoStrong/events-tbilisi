"use client";

import React, { useEffect, useState } from "react";
import { getActivitiesByUserId } from "@/lib/functions/supabaseFunctions";
import { ActivityEntity, UserProfile } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import ActivityCard from "../activities/activityCard";

const UsersBody: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [postedActivities, setPostedActivities] = useState<
    ActivityEntity[] | null
  >(null);

  useEffect(() => {
    (async () => {
      const activities = await getActivitiesByUserId(user.id);
      setPostedActivities(activities);
    })();
  }, [user.id]);

  return (
    <div className="my-5 w-full">
      <Tabs
        defaultValue="posted"
        className="flex w-full flex-col rounded-xl py-5 dark:bg-gray-900"
      >
        <div className="flex w-full justify-center">
          <TabsList>
            <TabsTrigger className="text-base" value="posted">
              Posted Activities
            </TabsTrigger>
            <TabsTrigger className="text-base" value="attended">
              Attended Activities
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="posted">
          <div className="grid w-full grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3">
            {postedActivities?.length === 0 && (
              <p className="col-span-full text-center text-lg">
                This user has not posted any activities yet.
              </p>
            )}
            {postedActivities?.map((activity) => (
              <div
                key={activity.id}
                onClick={() => {
                  redirect(`/activities/${activity.id}`);
                }}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="attended" className="text-center">
          In the development...
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default UsersBody;
