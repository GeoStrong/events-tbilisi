"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { EventEntity, NewEventEntity, UserProfile } from "@/lib/types";
import CreateActivityMobileMap from "../create-activity/createActivityMobileMap";
import CreateActivityAlert from "../create-activity/createActivityAlert";
import useModifyActivity from "@/lib/hooks/useModifyActivity";

const EventUpdate: React.FC<{ user: UserProfile; event: EventEntity }> = ({
  event,
  user,
}) => {
  const {
    title,
    description,
    date,
    time,
    endTime,
    location,
    link,
    image,
    targetAudience,
    maxAttendees,
    host,
    googleLocation,
    categories,
  } = event;
  const { isMobile } = useScreenSize();

  const initialValues: NewEventEntity = {
    title,
    description,
    date: typeof date === "string" ? date?.toLocaleString().split("T")[0] : "",
    time,
    endTime,
    location,
    link,
    image,
    targetAudience,
    maxAttendees,
    host,
    categories,
    googleLocation,
  };

  const { formikComponent, openMobileMapRef, openCreateActivityAlertRef } =
    useModifyActivity({
      user: user,
      eventId: event.id,
      latLng: googleLocation,
      initialValues: initialValues,
      isUpdatingActivity: true,
      enableMapFloating: false,
      image: image,
    });

  return (
    <>
      <Drawer
        repositionInputs={false}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerTrigger className="h-12 rounded-md border bg-white px-8 text-black">
          Edit
        </DrawerTrigger>
        <DrawerContent className="h-1/2 w-full">
          <DrawerHeader>
            <DrawerTitle className="mb-3 text-center text-xl">
              Edit Activity
            </DrawerTitle>
            <div className="">
              <CreateActivityMobileMap buttonRef={openMobileMapRef} />
            </div>
            <div className="h-[85%] overflow-y-scroll">{formikComponent}</div>
            <CreateActivityAlert
              buttonRef={openCreateActivityAlertRef}
              isActivityCreated={false}
            />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default EventUpdate;
