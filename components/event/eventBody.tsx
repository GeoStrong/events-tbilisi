import { EventEntity } from "@/lib/types";
import Image from "next/image";
import React from "react";
import defaultEventImg from "@/public/images/default-event-img.png";

const EventBody: React.FC<{ event: EventEntity }> = ({ event }) => {
  return (
    <div className="mt-5 grid grid-cols-1 rounded-xl bg-white px-2 py-4 dark:bg-gray-900 md:px-6">
      <div className="">
        <Image
          src={event.image || defaultEventImg.src}
          width={100}
          height={100}
          alt="event"
          className={`max-h-48 w-full rounded-md ${event.image ? "object-cover" : "object-contain"}`}
        />
        <h3 className="my-2 text-lg font-semibold">About the Event</h3>
        <p className="">{event.description}</p>
      </div>
    </div>
  );
};
export default EventBody;
