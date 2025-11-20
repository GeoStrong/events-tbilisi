"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import MapWrapper from "@/components/map/map";
import DisplayEventsBtnWrapper from "@/components/map/displayEventsBtn";
import EventDescription from "@/components/events/eventDescription";
import useAddSearchQuery from "@/lib/hooks/useAddSearchQuery";
import MapLoadingLayout from "./mapLayoutLoading";
import { useDispatch } from "react-redux";
import { mapActions } from "@/lib/store/mapSlice";
import { EventEntity } from "@/lib/types";
import { getEvents } from "@/lib/functions/supabaseFunctions";

interface MapLayoutProps {
  mapKey: string;
}

const MapLayout: React.FC<MapLayoutProps> = ({ mapKey }) => {
  const eventButtonRef = useRef<HTMLButtonElement>(null!);
  const { searchParams, handleReplace } = useAddSearchQuery();
  const dispatch = useDispatch();
  const [events, setEvents] = useState<EventEntity[] | []>([]);

  useEffect(() => {
    (async () => {
      const events = (await getEvents()) as EventEntity[];
      setEvents(events);
    })();
  }, []);

  const eventId = searchParams.get("activity");
  const activeEvent = eventId ? events.find((e) => e.id === eventId) : null;

  useEffect(() => {
    dispatch(mapActions.setIsFloatingEnabled(false));
  }, [dispatch]);

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
      <div className="flex w-full flex-col gap-2 rounded-md bg-white dark:bg-gray-800 md:mt-3 lg:flex-row">
        <div className="absolute -top-40 left-0 w-full rounded-2xl md:static">
          <MapWrapper API_KEY={mapKey} />
        </div>
        <div className="fixed bottom-16 left-0 flex w-full justify-center">
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
