import React from "react";
import EventHeader from "./eventHeader";
import { EventEntity } from "@/lib/types";
import EventBody from "./eventBody";
import EventFooter from "./eventFooter";
import { getCategoriesByEventId } from "@/lib/functions/supabaseFunctions";

const Event: React.FC<{ event: EventEntity; eventId: string }> = async ({
  event,
  eventId,
}) => {
  const categories = await getCategoriesByEventId(eventId);
  return (
    <>
      <EventHeader categories={categories} event={event} />
      <EventBody categories={categories} event={event} />
      <EventFooter categories={categories} eventId={eventId} />
    </>
  );
};
export default Event;
