"use client";

import { Category, EventEntity } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultEventImg from "@/public/images/default-event-img.png";
import EventDetails from "./eventDetails";
import Link from "next/link";
import Socials from "../general/socials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiUser } from "react-icons/bi";
import { Button } from "../ui/button";
import { CiShare1 } from "react-icons/ci";
import {
  getEventImageUrl,
  getEventsByCategoryId,
} from "@/lib/functions/supabaseFunctions";
import { Badge } from "../ui/badge";

interface EventBodyProps {
  categories: Category[];
  event: EventEntity;
}

const EventBody: React.FC<EventBodyProps> = ({ event, categories }) => {
  const [eventImage, setEventImage] = useState<string>();
  const [similarEvents, setSimilarEvents] = useState<EventEntity[]>([]);

  // const twoEvents = events.slice(0, 2);

  useEffect(() => {
    (async () => {
      const events = await getEventsByCategoryId(
        categories[0].id.toLocaleString(),
      );

      setSimilarEvents(events);
    })();
  }, [categories]);

  useEffect(() => {
    (async () => {
      const imageUrl = await getEventImageUrl(event.image);

      setEventImage(imageUrl!);
    })();
  }, [event.image]);

  return (
    <div className="mb-10 mt-5 grid grid-cols-1 grid-rows-3 gap-5 lg:grid-cols-4">
      <div className="col-span-3 row-span-3 flex flex-col gap-5 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 md:px-6">
        <div className="rounded-md bg-white">
          <Image
            src={eventImage || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`max-h-56 w-full rounded-md object-center ${event.image ? "object-cover" : "object-contain"}`}
            unoptimized
          />
        </div>
        <div className="w-full">
          <h3 className="my-3 text-base font-semibold md:text-xl">
            About the Event
          </h3>
          <div className="flex items-end justify-between">
            <div className="flex gap-2">
              {categories.map((category) => (
                <span
                  key={category.id}
                  className={`rounded-full bg-${category.color} px-2 py-1 text-sm text-white`}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <Badge
              variant={`${event.status === "active" ? "success" : event.status === "inactive" ? "destructive" : "default"}`}
            >
              {event.status?.toUpperCase()}
            </Badge>
          </div>
          <p className="mt-3 text-sm text-muted-foreground md:text-lg">
            {event.description}
          </p>
          <h3 className="mt-3 text-base font-semibold md:text-xl">
            Event Details:
          </h3>
          <div className="mt-2 flex w-full flex-col justify-between md:flex-row">
            <div className="space-y-1">
              <EventDetails detail="📍 Address" value={event.location} />
              <EventDetails detail="⌚ Time" value={event.time as string} />
              <EventDetails
                detail="📅 Date"
                value={
                  event.date &&
                  new Date(event.date).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                    weekday: "short",
                    day: "numeric",
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <EventDetails detail="🔗 Link" value={event.link} />
              <EventDetails
                detail="👥 Target Audience"
                value={event.targetAudience}
              />
              <EventDetails
                detail="🔢 Max Attendees"
                value={event.maxAttendees}
              />
            </div>
          </div>

          {event.link && (
            <Link
              href={event.link}
              className="mt-2 block text-blue-500 underline"
              target="_blank"
            >
              Learn More
            </Link>
          )}
          <div className="mt-2">
            {event.tags &&
              event.tags.map((tag) => (
                <span key={tag} className="font-bold">
                  #{tag}
                </span>
              ))}
          </div>
          <h3 className="mt-3 text-base font-semibold md:text-xl">
            Share with your friends
          </h3>
          <Socials />
        </div>
      </div>
      <div className="col-span-3 max-h-40 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
        <h3 className="font-bold md:text-lg">Host</h3>
        <div className="flex items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={event.hostContact?.image} />
            <AvatarFallback>
              <BiUser />
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-row items-center justify-between gap-2 lg:flex-col">
            <span className="linear-yellow text-base">{event.hostName}</span>
            <Button>Follow</Button>
          </div>
        </div>
      </div>
      <div className="col-span-3 row-span-1 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
        <h3 className="font-bold md:text-lg">Additional Info</h3>
        <div className="flex items-center gap-2">
          <div className="mt-2 flex flex-col">
            <EventDetails
              detail="Target Audience"
              value={event.targetAudience}
            />
            <EventDetails
              detail="Maximum Attendees"
              value={event.maxAttendees}
            />
            <EventDetails
              detail="Participants"
              value={event.participants?.length}
            />
            <EventDetails
              detail="Host Email"
              value={event.hostContact?.email}
            />
            <EventDetails
              detail="Host Phone"
              value={event.hostContact?.phone}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
        <h3 className="font-bold md:text-lg">
          Explore More {categories[0].name} Events
        </h3>
        <div className="mt-3 flex flex-col gap-2">
          {similarEvents.map((event) => (
            <div
              key={event.id}
              className="flex justify-between gap-2 rounded-lg border p-2 dark:border-gray-600"
            >
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {event.date &&
                    new Date(event.date).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                      weekday: "short",
                      day: "numeric",
                    })}
                </p>
              </div>
              <Link href={`/${event.id}`}>
                <CiShare1 />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EventBody;
