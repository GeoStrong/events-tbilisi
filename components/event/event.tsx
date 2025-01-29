import React from "react";
import EventHeader from "./eventHeader";
import { EventEntity } from "@/lib/types";
import EventBody from "./eventBody";

const Event: React.FC<{ event: EventEntity }> = ({ event }) => {
  return (
    <>
      <EventHeader event={event} />
      <EventBody event={event} />
    </>
  );
};
export default Event;
