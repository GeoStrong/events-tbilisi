"use client";

import React from "react";
import { NewEventEntity } from "@/lib/types";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { authActions } from "@/lib/store/authSlice";
import CreateActivityLoading from "./createActivityLoading";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import MapWrapper from "../map/map";
import useScreenSize from "@/lib/hooks/useScreenSize";
import CreateActivityMobileMap from "./createActivityMobileMap";
import CreateActivityAlert from "./createActivityAlert";
import useModifyActivity from "@/lib/hooks/useModifyActivity";

const CreateActivityLayout: React.FC<{ mapKey: string }> = ({ mapKey }) => {
  const dispatch = useDispatch();
  const { userProfile, user } = useGetUserProfile();
  const { latLng } = useSelector((state: RootState) => state.map);
  const { isMobile } = useScreenSize();

  const initialValues: NewEventEntity = {
    title: "",
    description: "",
    date: null,
    time: "",
    endTime: "",
    location: "",
    link: "",
    image: "",
    targetAudience: null,
    maxAttendees: null,
    host: "individual",
    categories: [],
    googleLocation: latLng,
  };

  const { formikComponent, openCreateActivityAlertRef, openMobileMapRef } =
    useModifyActivity({
      user: user,
      latLng: latLng,
      initialValues: initialValues,
      isUpdatingActivity: false,
      enableMapFloating: true,
    });

  return (
    <div className="mt-3 flex w-full flex-col justify-between gap-2 rounded-md bg-white dark:bg-gray-800 md:max-h-[500px] lg:flex-row">
      {isMobile ? (
        <div className="md:hidden">
          <CreateActivityMobileMap buttonRef={openMobileMapRef} />
        </div>
      ) : (
        <div className="hidden w-full rounded-2xl md:block">
          <MapWrapper API_KEY={mapKey} height="h-96" displayEvents={false} />
        </div>
      )}
      <div className="w-full p-3 pb-10 md:pb-0">
        {!userProfile && <CreateActivityLoading />}
        {userProfile?.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-xl">
              Please sign up or log in to your account to create an activity
            </p>
            <Button
              className="border"
              variant="ghost"
              onClick={() => {
                dispatch(authActions.setAuthDialogOpen(true));
              }}
            >
              Sign in
            </Button>
          </div>
        ) : (
          userProfile && <>{formikComponent}</>
        )}
      </div>
      <CreateActivityAlert
        buttonRef={openCreateActivityAlertRef}
        isActivityCreated={true}
      />
    </div>
  );
};
export default CreateActivityLayout;
