"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
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
import { toast } from "sonner";
import CreateActivityForm from "../create-activity/createActivityForm";
import CreateActivityAlert from "../create-activity/createActivityAlert";
import { handleUploadFile, isFile } from "@/lib/functions/helperFunctions";
import {
  postNewEventCategories,
  updateEvent,
} from "@/lib/functions/supabaseFunctions";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isMobile } = useScreenSize();
  const openMobileMapRef = useRef<HTMLButtonElement | null>(null);
  const openCreateActivityAlertRef = useRef<HTMLButtonElement | null>(null);

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
      user_id: user.id,
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

    (await updateEvent(event.id, newActivity)) as EventEntity[];

    // if (values.categories)
    //   await postNewEventCategories(event.id!, values.categories);
  };

  const onOpenMobileMap = () => {
    if (openMobileMapRef) openMobileMapRef.current?.click();
  };

  const displayCreateActivityAlert = () => {
    if (openCreateActivityAlertRef) openCreateActivityAlertRef.current?.click();
  };

  useEffect(() => {
    if (image) setImagePreview(image.toString());
  }, [image]);

  return (
    <>
      <Drawer
        repositionInputs={false}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerTrigger className="rounded-md border bg-white px-8 text-black">
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  submitHandler(values);
                  resetForm();
                  setImagePreview(null);
                  toast.success("You edited your activity");
                  displayCreateActivityAlert();
                } catch (err) {
                  console.error(err);
                  toast.success("There was an error editing your activity");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {(formik) => (
                <CreateActivityForm
                  formik={formik}
                  latLng={googleLocation!}
                  imagePreview={imagePreview}
                  handleImagePreview={setImagePreview}
                  handleOpenMobileMap={onOpenMobileMap}
                  displayOpenMapButton={true}
                  styles="h-1/2"
                />
              )}
            </Formik>
            <CreateActivityAlert buttonRef={openCreateActivityAlertRef} />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default EventUpdate;
