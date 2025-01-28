"use client";

import { MdOutlineOpenInNew } from "react-icons/md";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { EventEntity } from "@/lib/types";
import useScreenSize from "@/lib/hooks/useScreenSize";
import Link from "next/link";
import Image from "next/image";
import defaultEventImg from "@/public/images/default-event-img.png";
import EventParticipation from "./eventParticipation";
import { makeFirstLetterUpperCase } from "@/lib/functions/helperFunctions";
import { getCategoryColor } from "@/lib/fakeData/categories";

const snapPoints = [0.5, 1];

interface EventDescriptionProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  event: EventEntity;
  setSearchParams: (query: string, value: string) => void;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  buttonRef,
  event,
  setSearchParams,
}) => {
  const { isMobile } = useScreenSize();
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <>
      <Drawer
        repositionInputs={false}
        snapPoints={isMobile ? snapPoints : [1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        direction={isMobile ? "bottom" : "right"}
        onClose={() => {
          setSearchParams("event", "");
        }}
      >
        <DrawerTrigger ref={buttonRef} className="hidden"></DrawerTrigger>
        <DrawerContent className="pt-5 md:overflow-y-auto">
          <DrawerHeader className="relative">
            <div className="absolute left-5 top-3 z-20 flex gap-2">
              {event.categories.map((category) => (
                <span
                  key={category}
                  className={`rounded-full ${getCategoryColor(category)} px-2 text-xs text-white`}
                >
                  {makeFirstLetterUpperCase(category)}
                </span>
              ))}
            </div>
            <Link href={`/${event.id}`}>
              <MdOutlineOpenInNew className="linear-yellow absolute right-5 top-2 duration-300 hover:text-primary" />
            </Link>
            <DrawerTitle className="mt-3 text-center text-3xl font-bold">
              {event.title}
            </DrawerTitle>
            <DrawerDescription className="text-left text-base">
              {event.description}
            </DrawerDescription>
            <div className="mt-5 text-left">
              {event?.hostName && (
                <p className="text-base">
                  Hosted by:{" "}
                  <span className="linear-yellow text-base">
                    {event?.hostName}
                  </span>
                </p>
              )}
              <p className="">
                Location:{" "}
                <span className="linear-yellow text-base">
                  {event.location}
                </span>
              </p>
              <p className="">
                Target Audience:
                <span className="linear-yellow text-base">
                  {" "}
                  {event.targetAudience}
                </span>
              </p>
              {event?.image && (
                <Image
                  src={event.image || defaultEventImg.src}
                  width={100}
                  height={100}
                  alt="event"
                  className="mt-5 h-44 w-full rounded-xl object-cover"
                />
              )}
              <div className="mt-3 flex items-center justify-evenly gap-2">
                <p className="text-md text-center">
                  Start Date:{" "}
                  <span className="linear-yellow block text-base">
                    {event.startDate.toDateString()}
                  </span>
                </p>
                <p className="text-md text-center">
                  End Date:{" "}
                  <span className="linear-yellow block text-base">
                    {event.endDate instanceof Date
                      ? event.endDate.toDateString()
                      : event.endDate}
                  </span>
                </p>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-2 md:flex-row-reverse">
            <EventParticipation isNested />
            <DrawerClose className="h-12 bg-transparent p-2">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default EventDescription;
