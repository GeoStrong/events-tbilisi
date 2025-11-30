"use client";

import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { mapActions } from "@/lib/store/mapSlice";
import { useDispatch } from "react-redux";

const ActivityUpdate: React.FC<{
  user: UserProfile;
  activity: ActivityEntity;
}> = ({ activity, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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
  const dispatch = useDispatch();
  const { latLng } = useSelector((state: RootState) => state.map);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (isDrawerOpen) dispatch(mapActions.setLatLng(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

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
      latLng: latLng || googleLocation,
      initialValues: initialValues,
      isUpdatingActivity: true,
      enableMapFloating: isDrawerOpen,
      image: image,
    });

  return (
    <>
      <Drawer
        repositionInputs={false}
        direction={isMobile ? "bottom" : "right"}
        snapPoints={isMobile ? [0.5, 1] : [1]}
        onOpenChange={(drawerState) => {
          setIsDrawerOpen(drawerState);
        }}
      >
        <DrawerTrigger className="h-10 w-1/2 rounded-md border bg-white px-8 text-black md:w-auto">
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
