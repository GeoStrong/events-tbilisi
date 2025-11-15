"use client";

import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { fetchSavedEvents } from "@/lib/profile/profile";
import { EventEntity } from "@/lib/types";
import EventCard from "../events/eventCard";
import Link from "next/link";

const ProfileSavedTab: React.FC<{ userId: string }> = ({ userId }) => {
  const [savedEvents, setSavedEvents] = useState<EventEntity[]>([]);

  useEffect(() => {
    (async () => {
      const events = await fetchSavedEvents(userId);
      setSavedEvents(events);
    })();
  }, [userId]);

  return (
    <>
      <TabsContent value="saved" className="space-y-4">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Saved Events</CardTitle>
            <CardDescription>
              Events you&apos;ve bookmarked for later.
            </CardDescription>
          </CardHeader>
          <CardDescription className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3">
            {savedEvents.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No saved events yet. Start exploring events to save your
                favorites!
              </p>
            ) : (
              <>
                {savedEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <EventCard event={event} />
                  </Link>
                ))}
              </>
            )}
          </CardDescription>
          {/* <CardContent>
            {savedEvents.length > 0 ? (
              <div className="space-y-4">
                {savedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
                  >
                    <div>
                      <h4 className="mb-1">{event.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (

            )}
          </CardContent> */}
        </Card>
      </TabsContent>
    </>
  );
};
export default ProfileSavedTab;
