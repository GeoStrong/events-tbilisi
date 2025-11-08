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
import { Category, EventEntity, Poi } from "@/lib/types";
import { zoomToLocation } from "@/lib/functions/helperFunctions";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store/store";
import Link from "next/link";
import { ImLocation2 } from "react-icons/im";
import { useLocalStorage } from "react-use";
import {
  getCategoriesByEventId,
  getEventImageUrl,
} from "@/lib/functions/supabaseFunctions";

interface EventCardProps {
  event: EventEntity;
  setSearchParams?: (query: string, value: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, setSearchParams }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { map } = useSelector((state: RootState) => state.map);
  const [eventImage, setEventImage] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setValue, removeValue] = useLocalStorage<Poi | null>(
    "location",
    null,
  );

  const setLocationToLocalStorage = (location: Poi) => {
    setValue(location);
  };

  const handleLocationClick = (location: google.maps.LatLngLiteral) => {
    const poi: Poi = {
      key: `event-${event.id}`,
      location: location,
    };
    setLocationToLocalStorage(poi);
    zoomToLocation(map, poi);
    setTimeout(() => {
      removeValue();
    }, 500);
    if (setSearchParams) {
      return setSearchParams("display-events", "");
    }
  };

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
            src={eventImage || defaultEventImg.src}
            width={100}
            height={100}
            alt="event"
            className={`h-full w-full rounded-t-xl ${!eventImage ? "object-contain" : "object-cover"}`}
          />
        </div>
        <div className="!my-2 h-4 w-full px-2 text-right">
          <div className="flex justify-end gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className={`rounded-full bg-${category.color} px-2 text-xs text-white`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <CardTitle className="px-6">{event.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-muted-foreground">{event.hostName}</p>
        {event.googleLocation && (
          <Link
            href="/Map"
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
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {new Date(event.startDate).toLocaleDateString("en-US", {
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
