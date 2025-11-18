"use client";

import React, { useEffect, useState } from "react";
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
import { Category, EventEntity } from "@/lib/types";
import Link from "next/link";
import { ImLocation2 } from "react-icons/im";
import {
  getCategoriesByEventId,
  getEventImageUrl,
} from "@/lib/functions/supabaseFunctions";
import { BiTimeFive } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import useMapZoom from "@/lib/hooks/useMapZoom";

interface EventCardProps {
  event: EventEntity;
  setSearchParams?: (query: string, value: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, setSearchParams }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [eventImage, setEventImage] = useState<string | null>();
  const { handleLocationClick } = useMapZoom(event.id);

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesByEventId(event.id);
      setCategories(categories || []);
    })();
  }, [event.id]);

  useEffect(() => {
    (async () => {
      const imageUrl = await getEventImageUrl(event.image);

      setEventImage(imageUrl);
    })();
  }, [event.image]);

  return (
    <Card
      className="cursor-pointer duration-300 dark:border-gray-600 dark:bg-slate-800"
      onClick={() => {
        if (setSearchParams)
          return setSearchParams("activity", event.id.toString());
      }}
      key={event.id}
    >
      <CardHeader className="relative p-0">
        <div className="group relative h-48 w-full overflow-hidden rounded-t-xl bg-white">
          <Image
            src={eventImage || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`h-full w-full transform rounded-t-xl transition-transform duration-300 group-hover:scale-105 ${!eventImage ? "object-contain" : "object-cover"}`}
            unoptimized
          />
        </div>
        <div className="absolute top-0 h-4 w-full px-2 text-right">
          <div className="grid grid-cols-2 gap-2 justify-self-end md:grid-cols-3">
            {categories.map((category) => (
              <span
                key={category.id}
                className={`rounded-full text-center bg-${category.color} px-3 py-1 text-sm text-white`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="px-6 text-xl">{event.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between pb-0">
        <p className="text-lg">
          {event.location && event.location.toLocaleString()}
        </p>
        <p className="text-muted-foreground">{event.hostName}</p>
        {event.googleLocation && (
          <Link
            href="/map"
            onClick={(e) => {
              e.stopPropagation();
              if (event.googleLocation) {
                handleLocationClick(event.googleLocation);
              }
            }}
            className="rounded-md border border-primary bg-transparent p-2"
          >
            <ImLocation2 className="text-primary" />
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        <p className="flex items-center gap-1 text-base text-muted-foreground">
          <BiTimeFive />
          {event.time && event.time.toLocaleString()}
        </p>
        <p className="flex items-center gap-1 text-base text-muted-foreground">
          <MdDateRange />
          {event.date &&
            new Date(event.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              weekday: "short",
              day: "numeric",
            })}
        </p>
      </CardFooter>
    </Card>
  );
};
export default EventCard;
