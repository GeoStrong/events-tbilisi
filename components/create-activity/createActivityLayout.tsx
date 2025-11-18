"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import CreateActivityForm from "./createActivityForm";
import { EventEntity, NewEventEntity } from "@/lib/types";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { handleUploadFile, isFile } from "@/lib/functions/helperFunctions";
import {
  postNewEvent,
  postNewEventCategories,
} from "@/lib/functions/supabaseFunctions";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { authActions } from "@/lib/store/authSlice";
import CreateActivityLoading from "./createActivityLoading";
import { mapActions } from "@/lib/store/mapSlice";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { toast } from "sonner";
import MapWrapper from "../map/map";
import useScreenSize from "@/lib/hooks/useScreenSize";
import CreateActivityMobileMap from "./createActivityMobileMap";
import CreateActivityAlert from "./createActivityAlert";

const CreateActivityLayout: React.FC<{ mapKey: string }> = ({ mapKey }) => {
  const dispatch = useDispatch();
  const { userProfile, user } = useGetUserProfile();
  const { latLng } = useSelector((state: RootState) => state.map);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isMobile } = useScreenSize();
  const openMobileMapRef = useRef<HTMLButtonElement | null>(null);
  const openCreateActivityAlertRef = useRef<HTMLButtonElement | null>(null);

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

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
    categories: Yup.array()
      .min(1, "Category is required")
      .max(3, "Maximum 3 categories allowed"),
    googleLocation: Yup.object().required(),
  });

  const submitHandler = async (values: NewEventEntity) => {
    const imageUrl =
      isFile(values.image) &&
      (await handleUploadFile("activities", values.image, user!));

    const newActivity: NewEventEntity = {
      user_id: user?.id,
      title: values.title,
      description: values.description,
      date: values.date,
      time: values.time,
      endTime: values.endTime || null,
      location: values.location,
      link: values.link || null,
      status: "active",
      targetAudience: values.targetAudience || null,
      maxAttendees: values.maxAttendees || null,
      image: imageUrl || null,
      googleLocation: values.googleLocation,
    };

    const newEvent = (await postNewEvent(newActivity)) as EventEntity[];

    if (values.categories)
      await postNewEventCategories(newEvent[0].id!, values.categories);
  };

  useEffect(() => {
    dispatch(mapActions.setIsFloatingEnabled(true));
  }, [dispatch]);

  const onOpenMobileMap = () => {
    if (openMobileMapRef) openMobileMapRef.current?.click();
  };

  const displayCreateActivityAlert = () => {
    if (openCreateActivityAlertRef) openCreateActivityAlertRef.current?.click();
  };

  return (
    <div className="mt-3 flex w-full flex-col justify-between gap-2 rounded-md bg-white dark:bg-gray-800 md:max-h-[500px] lg:flex-row">
      {isMobile ? (
        <div className="md:hidden">
          <CreateActivityMobileMap
            API_KEY={mapKey}
            buttonRef={openMobileMapRef}
          />
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
          userProfile && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  submitHandler(values);
                  resetForm();
                  setImagePreview(null);
                  toast.success("You posted a new activity");
                  displayCreateActivityAlert();
                } catch (err) {
                  console.error(err);
                  toast.success("There was an error posting your activity");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {(formik) => (
                <CreateActivityForm
                  formik={formik}
                  handleImagePreview={setImagePreview}
                  latLng={latLng}
                  imagePreview={imagePreview}
                  handleOpenMobileMap={onOpenMobileMap}
                />
              )}
            </Formik>
          )
        )}
      </div>
      <CreateActivityAlert buttonRef={openCreateActivityAlertRef} />
    </div>
  );
};
export default CreateActivityLayout;
