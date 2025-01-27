import React from "react";
import EventHeader from "./eventHeader";
import { EventEntity } from "@/lib/types";
import defaultEventImg from "@/public/images/default-event-img.png";
import EventBody from "./eventBody";

const Event: React.FC<{ event: EventEntity }> = ({ event }) => {
  const image = event.image || defaultEventImg.src;

  return (
    <>
      <EventHeader img={image} title={event.title} />
      <EventBody event={event} />
    </>
  );
};
export default Event;
