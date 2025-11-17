"use client";

import React from "react";
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

const CreateActivityLayout: React.FC = () => {
  const { user } = useGetUserProfile();
  const dispatch = useDispatch();

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
    };

    const newEvent = (await postNewEvent(newActivity)) as EventEntity;

    if (values.categories)
      await postNewEventCategories(newEvent.id, values.categories);
  };

  return (
    <div className="w-full p-3 pb-10 md:pb-0">
      {user ? (
        <CreateActivityForm onSubmit={submitHandler} />
      ) : (
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
      )}
    </div>
  );
};
export default CreateActivityLayout;
