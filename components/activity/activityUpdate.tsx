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
import { ActivityEntity, NewActivityEntity, UserProfile } from "@/lib/types";
import CreateActivityMobileMap from "../create-activity/createActivityMobileMap";
import CreateActivityAlert from "../create-activity/createActivityAlert";
import useModifyActivity from "@/lib/hooks/useModifyActivity";

const ActivityUpdate: React.FC<{
  user: UserProfile;
  activity: ActivityEntity;
}> = ({ activity, user }) => {
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
  } = activity;

  const { isMobile } = useScreenSize();

  const initialValues: NewActivityEntity = {
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
      activityId: activity.id,
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
        snapPoints={isMobile ? [0.5, 1] : [1]}
      >
        <DrawerTrigger className="h-12 rounded-md border bg-white px-8 text-black">
          Edit
        </DrawerTrigger>
        <DrawerContent className="w-full">
          <DrawerHeader>
            <DrawerTitle className="mb-3 text-center text-xl">
              Edit Activity
            </DrawerTitle>
            <div className="">
              <CreateActivityMobileMap buttonRef={openMobileMapRef} />
            </div>
            <div className="h-[75%] md:h-[85%]">{formikComponent}</div>
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
export default ActivityUpdate;
