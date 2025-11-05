"use client";

import React, { useEffect, useRef } from "react";
import MapWrapper from "@/components/map/map";
import DisplayEventsBtnWrapper from "@/components/map/displayEventsBtn";
import EventDescription from "@/components/events/eventDescription";
import events from "@/lib/fakeData/events";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";

const MapLayout: React.FC<{ mapKey: string }> = ({ mapKey }) => {
  const eventButtonRef = useRef<HTMLButtonElement>(null!);
  const { searchParams, handleReplace } = useAddSearchQuery();

  const eventId = searchParams.get("event");
  const activeEvent = eventId ? events.find((e) => e.id === +eventId) : null;

  useEffect(() => {
    if (activeEvent && eventButtonRef.current) {
      eventButtonRef.current.click();
    }
  }, [activeEvent]);

  const setSearchParams = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    handleReplace(params);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 lg:flex-row">
        <div className="absolute -top-24 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={mapKey} />
        </div>
        <div className="fixed bottom-14 left-0 flex w-full justify-center">
          <DisplayEventsBtnWrapper />
        </div>
      </div>
      {activeEvent && (
        <EventDescription
          buttonRef={eventButtonRef}
          event={activeEvent}
          setSearchParams={setSearchParams}
        />
      )}
    </>
  );
};
export default MapLayout;
