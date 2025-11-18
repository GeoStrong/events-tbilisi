"use client";

import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { fetchSavedEvents } from "@/lib/profile/profile";
import { EventEntity } from "@/lib/types";
import EventCard from "../events/eventCard";
import { redirect } from "next/navigation";

const ProfileActivitiesTab: React.FC<{ userId: string }> = ({ userId }) => {
  const [savedEvents, setSavedEvents] = useState<EventEntity[]>([]);

  useEffect(() => {
    (async () => {
      const events = await fetchSavedEvents(userId);
      setSavedEvents(events);
    })();
  }, [userId]);

  return (
    <>
      <TabsContent value="activities" className="space-y-4">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Saved Events</CardTitle>
            <CardDescription>
              Activities you&apos;ve bookmarked for later.
            </CardDescription>
          </CardHeader>
          <CardDescription className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3">
            {savedEvents.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No saved activities yet. Start exploring activities to save your
                favorites!
              </p>
            ) : (
              <>
                {savedEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      redirect(`/activities/${event.id}`);
                    }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </>
            )}
          </CardDescription>
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfileActivitiesTab;
