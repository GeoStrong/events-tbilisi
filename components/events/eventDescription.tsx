"use client";
import { FiShare } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
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
        snapPoints={isMobile ? snapPoints : [1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        direction={isMobile ? "bottom" : "right"}
        onClose={() => {
          setSearchParams("event", "");
        }}
      >
        <DrawerTrigger ref={buttonRef} className="hidden"></DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerPortal>
          <DrawerContent
            headerChildren={
              <Link href={`/${event.id}`} className="absolute right-5 top-4">
                <MdOutlineOpenInNew className="linear-yellow duration-300 hover:text-primary" />
              </Link>
            }
            className="mx-[-1px] flex h-full flex-col border-0 bg-white"
          >
            <div className="flex h-screen w-full flex-col overflow-y-auto">
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
                <DrawerTitle className="mt-3 text-center text-xl font-bold">
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
                  <p className="de mt-4 flex items-center justify-between gap-2 md:justify-start">
                    Share this event with friends:
                    <FiShare className="text-xl" />
                  </p>
                </div>
              </DrawerHeader>
              <DrawerFooter className="flex flex-col gap-2 md:flex-row-reverse">
                <EventParticipation isNested />
                <DrawerClose className="h-12 bg-transparent p-2">
                  Cancel
                </DrawerClose>
              </DrawerFooter>
              {snap !== 1 && isMobile && (
                <div className="min-h-96 w-full"></div>
              )}
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </>
  );
};
export default EventDescription;
