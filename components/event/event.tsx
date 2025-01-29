import React from "react";
import EventHeader from "./eventHeader";
import { EventEntity } from "@/lib/types";
import EventBody from "./eventBody";
import EventFooter from "./eventFooter";

const Event: React.FC<{ event: EventEntity; eventId: string }> = ({
  event,
  eventId,
}) => {
  return (
    <>
      <EventHeader event={event} />
      <EventBody event={event} />
      <EventFooter categories={event.categories} eventId={eventId} />
    </>
  );
};
export default Event;
