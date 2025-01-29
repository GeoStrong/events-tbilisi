"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import defaultEventImg from "@/public/images/default-event-img.png";
import { EventEntity } from "@/lib/types";
import { makeFirstLetterUpperCase } from "@/lib/functions/helperFunctions";
import { getCategoryColor } from "@/lib/fakeData/categories";

interface EventCardProps {
  event: EventEntity;
  setSearchParams?: (query: string, value: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, setSearchParams }) => {
  return (
    <Card
      className="cursor-pointer duration-300 hover:scale-105 dark:bg-slate-800"
      onClick={() => {
        if (setSearchParams)
          return setSearchParams("event", event.id.toString());
      }}
      key={event.id}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full rounded-t-xl bg-white">
          <Image
            src={event.image || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`h-full w-full rounded-t-xl ${!event.image ? "object-contain" : "object-cover"}`}
          />
        </div>
        <div className="!my-2 h-4 w-full px-2 text-right">
          <div className="flex justify-end gap-2">
            {event.categories.map((category) => (
              <span
                key={category}
                className={`rounded-full ${getCategoryColor(category)} px-2 text-xs text-white`}
              >
                {makeFirstLetterUpperCase(category)}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="px-6">{event.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{event.hostName}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {event.date.toDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};
export default EventCard;
