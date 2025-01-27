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
import { Button } from "../ui/button";
import { EventEntity } from "@/lib/types";
import useScreenSize from "@/lib/hooks/useScreenSize";
import Link from "next/link";
import Image from "next/image";
import defaultEventImg from "@/public/images/default-event-img.png";
import EventParticipation from "./eventParticipation";

const snapPoints = ["200px", 1];

interface EventDescriptionProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  event: EventEntity;
  setSearchParams: (params: string) => void;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  buttonRef,
  event,
  setSearchParams,
}) => {
  const { isMobile, height } = useScreenSize();
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <>
      <Drawer
        repositionInputs={false}
        snapPoints={isMobile && event.image && height < 750 ? snapPoints : [1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        direction={isMobile ? "bottom" : "right"}
        onClose={() => {
          setSearchParams("");
        }}
      >
        <DrawerTrigger ref={buttonRef} className="hidden"></DrawerTrigger>
        <DrawerContent className="pt-5 md:overflow-y-auto">
          <DrawerHeader className="relative">
            <div className="absolute left-5 top-1 z-20">
              <span className="rounded-full bg-primary px-2 text-xs text-white">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>
            <Link href={`/${event.id}`}>
              <MdOutlineOpenInNew className="linear-dark absolute right-5 top-2 duration-300 hover:text-primary" />
            </Link>
            <DrawerTitle className="linear-light text-center text-3xl font-bold">
              {event.title}
            </DrawerTitle>
            <DrawerDescription className="text-left text-lg">
              {event.description}
            </DrawerDescription>
            <div className="mt-5 text-left">
              {event?.hostName && (
                <p className="text-lg">
                  Hosted by:{" "}
                  <span className="linear-dark text-lg">{event?.hostName}</span>
                </p>
              )}
              <p className="">
                Location:{" "}
                <span className="linear-dark text-lg">{event.location}</span>
              </p>
              <p className="">
                Target Audience:
                <span className="linear-dark text-lg">
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
                  <span className="linear-dark block text-lg">
                    {event.startDate.toDateString()}
                  </span>
                </p>
                <p className="text-md text-center">
                  End Date:{" "}
                  <span className="linear-dark block text-lg">
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
            <DrawerClose>
              <Button
                className="h-12 w-full bg-transparent text-lg"
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default EventDescription;
