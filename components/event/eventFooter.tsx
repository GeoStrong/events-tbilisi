"use client";

import React from "react";
import { EventCategories } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getEvents } from "@/lib/functions/getEvents";
import EventCard from "../events/eventCard";
import Link from "next/link";
import { makeFirstLetterUpperCase } from "@/lib/functions/helperFunctions";
import useScreenSize from "@/lib/hooks/useScreenSize";

const EventFooter: React.FC<{
  categories: EventCategories[];
  eventId: string;
}> = ({ categories, eventId }) => {
  const { isMobile } = useScreenSize();
  const firstCategory = categories[0];
  const secondCategory = categories[1];

  const firstEvents = getEvents(firstCategory);
  const secondEvents = getEvents(secondCategory);

  return (
    <footer className="px-2 py-4 md:px-6">
      <div className="flex flex-col gap-3">
        <h3 className="font-bold">More Events like this</h3>
        <Carousel className="mx-10">
          <CarouselContent>
            {firstEvents.map((event) => {
              if (event.id === +eventId) return null;
              return (
                <CarouselItem key={event.id} className="md:basis-1/3">
                  <Link href={`/${event.id}`}>
                    <EventCard event={event} />
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {(isMobile || firstEvents.length > 3) && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>
      {secondCategory && (
        <div className="mt-10 flex flex-col gap-3">
          <h3 className="font-bold">
            Discover More {makeFirstLetterUpperCase(secondCategory)} Events
          </h3>
          <Carousel className="mx-10">
            <CarouselContent>
              {secondEvents.map((event) => {
                if (event.id === +eventId) return null;
                return (
                  <CarouselItem key={event.id} className="md:basis-1/3">
                    <Link href={`/${event.id}`}>
                      <EventCard event={event} />
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {(isMobile || secondEvents.length > 3) && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      )}
    </footer>
  );
};
export default EventFooter;
