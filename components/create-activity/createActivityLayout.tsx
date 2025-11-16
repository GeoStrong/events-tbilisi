"use client";

import React from "react";
import CreateActivityForm from "./createActivityForm";
import { NewEventEntity } from "@/lib/types";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { handleUploadFile, isFile } from "@/lib/functions/helperFunctions";
import { postNewEvent } from "@/lib/functions/supabaseFunctions";

const CreateActivityLayout: React.FC = () => {
  const { user } = useGetUserProfile();

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

    await postNewEvent(newActivity);
  };

  return (
    <div className="w-full p-3">
      <CreateActivityForm onSubmit={submitHandler} />
    </div>
  );
};
export default CreateActivityLayout;
