"use client";

import React, { useEffect, useRef, useState } from "react";
import events from "@/lib/fakeData/events";
import { EventEntity } from "@/lib/types";
import EventCard from "./eventCard";
import EventDescription from "./eventDescription";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      openDrawer();
    }
  }, [searchParams]);

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
export default EventCards;
