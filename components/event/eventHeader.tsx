import React from "react";
import Image from "next/image";
import Link from "next/link";
import EventParticipation from "../events/eventParticipation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";
import Share from "../general/share";
import { EventEntity } from "@/lib/types";
import defaultEventImg from "@/public/images/default-event-img.png";
import { getEventImageUrl } from "@/lib/functions/supabaseFunctions";

const EventHeader: React.FC<{
  event: EventEntity;
}> = async ({ event }) => {
  const imageUrl = await getEventImageUrl(event.image);

  return (
    <>
      <header className="sticky top-20 z-40 mt-5 flex items-center justify-start gap-5 rounded-xl bg-white px-2 py-4 shadow-md dark:bg-gray-900 md:static md:px-6">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 md:hidden"
          >
            <IoMdArrowRoundBack />
          </Link>
          <Image
            src={imageUrl || defaultEventImg.src}
            alt="event"
            width={100}
            height={100}
            className="hidden w-64 rounded-md bg-white md:block"
            unoptimized
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3 md:flex-col md:items-start md:justify-start">
          <h2 className="text-xl font-bold md:text-3xl">{event.title}</h2>
          <div className="flex gap-3">
            <BiBookmark className="text-lg md:text-2xl" />
            <Share event={event}>
              <FiShare className="text-lg md:text-2xl" />
            </Share>
          </div>
        </div>
        <div className="fixed bottom-14 left-0 flex w-full justify-center md:static md:bottom-0 md:justify-end">
          <EventParticipation isBtnLarge />
        </div>
      </header>
    </>
  );
};
export default EventHeader;
