import React from "react";
import Image from "next/image";
import Link from "next/link";
import EventParticipation from "../events/eventParticipation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";

const EventHeader: React.FC<{
  img: string;
  title: string;
}> = ({ img, title }) => {
  return (
    <>
      <header className="sticky mt-5 flex items-center justify-start gap-5 rounded-xl bg-white px-2 py-4 dark:bg-gray-900 md:px-6">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 md:hidden"
          >
            <IoMdArrowRoundBack />
          </Link>
          <Image
            src={img}
            alt="event"
            width={100}
            height={100}
            className="hidden w-64 rounded-md bg-white md:block"
          />
        </div>
        <div className="flex w-full items-center justify-between gap-3 md:flex-col md:items-start md:justify-start">
          <h2 className="text-xl font-bold md:text-3xl">{title}</h2>
          <div className="flex gap-3">
            <BiBookmark className="text-lg md:text-2xl" />
            <FiShare className="text-lg md:text-2xl" />
          </div>
        </div>
        <div className="fixed bottom-10 left-0 flex w-full justify-center md:static md:bottom-0 md:justify-end">
          <EventParticipation isBtnLarge />
        </div>
      </header>
    </>
  );
};
export default EventHeader;
