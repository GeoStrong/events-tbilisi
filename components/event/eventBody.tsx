"use client";

import { EventEntity } from "@/lib/types";
import Image from "next/image";
import React from "react";
import defaultEventImg from "@/public/images/default-event-img.png";
import EventDetails from "./eventDetails";
import Link from "next/link";
import Socials from "../general/socials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiUser } from "react-icons/bi";
import { Button } from "../ui/button";
import { getCategoryColor } from "@/lib/fakeData/categories";
import { makeFirstLetterUpperCase } from "@/lib/functions/helperFunctions";

const EventBody: React.FC<{ event: EventEntity }> = ({ event }) => {
  return (
    <div className="mb-10 mt-5 grid grid-cols-1 grid-rows-4 gap-5 lg:grid-cols-4">
      <div className="col-span-3 row-span-4 flex flex-col gap-5 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 md:px-6">
        <div className="rounded-md bg-white">
          <Image
            src={event.image || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`max-h-56 w-full rounded-md object-center ${event.image ? "object-cover" : "object-contain"}`}
          />
        </div>
        <div className="w-full">
          <h3 className="my-3 text-base font-semibold md:text-xl">
            About the Event
          </h3>
          <div className="flex gap-2">
            {event.categories.map((category) => (
              <span
                key={category}
                className={`rounded-full ${getCategoryColor(category)} px-2 text-xs text-white`}
              >
                {makeFirstLetterUpperCase(category)}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground md:text-lg">
            {event.description}
          </p>
          <h3 className="mt-3 text-base font-semibold md:text-xl">
            Event Details:
          </h3>
          <div className="mt-2">
            <EventDetails
              detail="📅 Date"
              value={event.startDate.toDateString()}
            />
            <EventDetails
              detail="⌚ Time"
              value={
                event.time instanceof Date
                  ? event.time.toDateString()
                  : event.time
              }
            />
            <EventDetails
              detail="📍 Address"
              value={
                event.time instanceof Date
                  ? event.time.toDateString()
                  : event.time
              }
            />
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
      <div className="col-span-3 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
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
      <div className="col-span-3 row-span-2 rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900 lg:col-span-1">
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
            <EventDetails detail="Status" value={event.status} />
            <EventDetails
              detail="End Date"
              value={
                event.endDate instanceof Date
                  ? event.endDate.toDateString()
                  : event.endDate
              }
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
    </div>
  );
};
export default EventBody;
