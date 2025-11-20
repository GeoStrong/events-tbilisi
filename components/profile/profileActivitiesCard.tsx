import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EventEntity } from "@/lib/types";
import { redirect } from "next/navigation";
import EventCard from "../events/eventCard";

interface ProfileActivitiesCardProps {
  activities: EventEntity[];
  title: string;
  description: string;
}

const ProfileActivitiesCard: React.FC<ProfileActivitiesCardProps> = ({
  activities,
  title,
  description,
}) => {
  return (
    <>
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {activities.length === 0 ? (
          <CardDescription className="p-3">
            <p className="col-span-2 py-8 text-center text-muted-foreground">
              There are no activities found!
            </p>
          </CardDescription>
        ) : (
          <CardDescription className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3">
            {activities.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  redirect(`/activities/${event.id}`);
                }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </CardDescription>
        )}
      </Card>
    </>
  );
};
export default ProfileActivitiesCard;
