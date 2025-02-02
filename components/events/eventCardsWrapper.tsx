"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { EventCategories, EventEntity } from "@/lib/types";
import EventCard from "./eventCard";
import EventDescription from "./eventDescription";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { getEvents } from "@/lib/functions/getEvents";
import { makeFirstLetterUpperCase } from "@/lib/functions/helperFunctions";
import { usePathname } from "next/navigation";

const EventCards: React.FC = () => {
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventEntity | null>(null);
  const [gridStyles, setGridStyles] = useState<string>("");
  const pathname = usePathname();
  const { searchParams, handleSearch } = useAddSearchQuery();
  const triggerRef = useRef<HTMLButtonElement>(null!);

  useEffect(() => {
    setGridStyles(
      pathname === "/Map"
        ? "lg:grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    );
  }, [pathname]);

  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      const events = getEvents(category as EventCategories);
      setEvents(events);
    } else {
      setEvents(getEvents());
    }
  }, [category, searchParams]);

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
  }, [events, searchParams]);

  useEffect(() => {
    if (activeEvent) openDrawer();
  }, [activeEvent]);

  return (
    <>
      <h2 className="section-title mt-10">
        {category ? makeFirstLetterUpperCase(category) : "Recent"} events
      </h2>
      {events.length === 0 && (
        <p className="mt-3 text-center">
          No events found for the selected category. Try another{" "}
          <span className="text-primary">category</span>.
        </p>
      )}
      <div className={`mt-3 grid gap-5 ${gridStyles}`}>
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
