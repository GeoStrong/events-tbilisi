"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import events from "@/lib/fakeData/events";
import { EventEntity } from "@/lib/types";
import EventCard from "./EventCard";
import EventDescription from "./EventDescription";

const EventCards: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<EventEntity | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null!);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("event", term);
    } else {
      params.delete("event");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const openDrawer = () => {
    setTimeout(() => {
      triggerRef?.current.click();
    }, 1);
  };

  useEffect(() => {
    const eventId = searchParams.get("event");
    if (eventId) {
      const event = events.find((event) => event.id === +eventId);
      setActiveEvent(event || null);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeEvent) openDrawer();
  }, [activeEvent]);

  return (
    <>
      <h2 className="section-title mt-5">Recent events</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            setSearchParams={handleSearch}
          />
        ))}
        {activeEvent && (
          <EventDescription
            buttonRef={triggerRef}
            event={activeEvent}
            setSearchParams={handleSearch}
          />
        )}
      </div>
    </>
  );
};

const EventCardsWrapper: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EventCards />
  </Suspense>
);

export default EventCardsWrapper;
