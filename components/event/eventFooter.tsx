"use client";

import React, { useEffect, useState } from "react";
import { Category, EventEntity } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "../events/eventCard";
import { getEventsByCategoryId } from "@/lib/functions/supabaseFunctions";
import { redirect } from "next/navigation";

const EventFooter: React.FC<{
  categories: Category[];
  eventId: string;
}> = ({ categories, eventId }) => {
  const [firstEvents, setFirstEvents] = useState<EventEntity[]>([]);
  const [secondEvents, setSecondEvents] = useState<EventEntity[]>([]);
  // const { isMobile } = useScreenSize();
  const firstCategory = categories[0].id;
  const secondCategory = categories[1].id;

  useEffect(() => {
    (async () => {
      const firstEvents = (await getEventsByCategoryId(
        firstCategory,
      )) as EventEntity[];

      setFirstEvents(firstEvents.filter((event) => event.id !== eventId));

      const secondEvents = secondCategory
        ? ((await getEventsByCategoryId(secondCategory)) as EventEntity[])
        : [];
      setSecondEvents(secondEvents.filter((event) => event.id !== eventId));
    })();
  }, [eventId, firstCategory, secondCategory]);

  return (
    <footer className="py-4">
      {firstEvents.length !== 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">More Events like this</h3>
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent>
              {firstEvents.map((event) => {
                if (event.id === eventId) return null;
                return (
                  <CarouselItem
                    key={event.id}
                    className="md:basis-1/3"
                    onClick={() => {
                      redirect(`/activities/${event.id}`);
                    }}
                  >
                    <EventCard event={event} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* {(isMobile || firstEvents.length > 3) && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )} */}
          </Carousel>
        </div>
      )}
      {secondCategory && secondEvents.length !== 0 && (
        <div className="mt-10 flex flex-col gap-3">
          <h3 className="font-bold">
            Discover More {categories[1].name} Events
          </h3>
          <Carousel>
            <CarouselContent>
              {secondEvents.map((event) => {
                if (event.id === eventId) return null;
                return (
                  <CarouselItem
                    key={event.id}
                    className="md:basis-1/3"
                    onClick={() => {
                      redirect(`/activities/${event.id}`);
                    }}
                  >
                    <EventCard event={event} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* {(isMobile || secondEvents.length > 3) && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )} */}
          </Carousel>
        </div>
      )}
    </footer>
  );
};
export default EventFooter;
