"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Category, EventEntity } from "@/lib/types";
import EventCard from "./eventCard";
import EventDescription from "./eventDescription";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import { usePathname } from "next/navigation";
import Spinner from "../general/spinner";
import {
  getEvents,
  getCategoryById,
  getEventsByCategoryId,
} from "@/lib/functions/supabaseFunctions";
import EventCardsLoading from "./eventCardsLoading";

const EventCards: React.FC = () => {
  const [events, setEvents] = useState<EventEntity[] | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventEntity | null>(null);
  const [gridStyles, setGridStyles] = useState<string>("");
  const pathname = usePathname();
  const { searchParams, handleSearch } = useAddSearchQuery();
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const categoryId = searchParams.get("category");

  const openDrawer = () => {
    setTimeout(() => {
      triggerRef?.current.click();
    }, 1);
  };

  useEffect(() => {
    if (activeEvent) openDrawer();
  }, [activeEvent]);

  useEffect(() => {
    setGridStyles(
      pathname === "/map"
        ? "lg:grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    );
  }, [pathname]);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const events = await getEventsByCategoryId(categoryId);
        setEvents(events);
      })();
    } else {
      (async () => {
        const events = await getEvents();
        setEvents(events);
      })();
    }
  }, [categoryId]);

  useEffect(() => {
    (async () => {
      const category =
        categoryId && ((await getCategoryById(categoryId)) as Category[]);
      setCategory(category || []);
    })();
  }, [categoryId]);

  useEffect(() => {
    const eventId = searchParams.get("event")!;
    if (eventId || events) {
      const event = events?.find((event) => event.id === eventId);
      setActiveEvent(event || null);
    }
  }, [events, searchParams]);

  return (
    <>
      <h1 className="section-title">
        {categoryId && category.length !== 0 ? category[0].name : "Recent"}{" "}
        events in Tbilisi
      </h1>
      {events === null && (
        <div className="mt-5">
          <Spinner />
        </div>
      )}
      {events?.length === 0 ? (
        <p className="mt-3 text-center">
          No events found for the selected category. Try another{" "}
          <span className="text-primary">category</span>.
        </p>
      ) : (
        <div className={`mt-3 grid gap-5 ${gridStyles}`}>
          {events?.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              setSearchParams={handleSearch}
            />
          ))}
          {activeEvent && pathname !== "/map" && (
            <EventDescription
              buttonRef={triggerRef}
              event={activeEvent}
              setSearchParams={handleSearch}
            />
          )}
        </div>
      )}
    </>
  );
};

const EventCardsWrapper: React.FC = () => (
  <Suspense fallback={<EventCardsLoading />}>
    <EventCards />
  </Suspense>
);

export default EventCardsWrapper;
