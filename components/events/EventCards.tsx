"use client";

import React, { useRef, useState } from "react";
import events from "@/lib/fakeData/events";
import EventCard from "./EventCard";
import EventDescription from "./EventDescription";
import { EventEntity } from "@/lib/types";

const EventCards: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<EventEntity | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null!);

  const openDrawer = () => {
    setTimeout(() => {
      triggerRef?.current.click();
    }, 1);
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          setEvent={setActiveEvent}
          handleDrawer={openDrawer}
        />
      ))}
      {activeEvent && (
        <EventDescription buttonRef={triggerRef} event={activeEvent} />
      )}
    </div>
  );
};
export default EventCards;
