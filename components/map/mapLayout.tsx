"use client";

import React, { Suspense, useEffect, useRef } from "react";
import MapWrapper from "@/components/map/map";
import DisplayEventsBtnWrapper from "@/components/map/displayEventsBtn";
import EventDescription from "@/components/events/eventDescription";
import events from "@/lib/data/events";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import MapLoadingLayout from "./mapLayoutLoading";

interface MapLayoutProps {
  mapKey: string;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapKey }) => {
  const eventButtonRef = useRef<HTMLButtonElement>(null!);
  const { searchParams, handleReplace } = useAddSearchQuery();

  const eventId = searchParams.get("event");
  const activeEvent = eventId ? events.find((e) => e.id === eventId) : null;

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

const MapLayoutWrapper: React.FC<MapLayoutProps> = ({ mapKey }) => (
  <Suspense fallback={<MapLoadingLayout />}>
    <MapLayout mapKey={mapKey} />
  </Suspense>
);

export default MapLayoutWrapper;
