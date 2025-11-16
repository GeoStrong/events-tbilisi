"use client";

import React from "react";
import CreateActivityForm from "./createActivityForm";
import { EventEntity } from "@/lib/types";
import { handleUploadFile } from "@/lib/functions/helperFunctions";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";

const CreateActivityLayout: React.FC = () => {
  const { user } = useGetUserProfile();

  const submitHandler = (values: EventEntity) => {
    console.log(values);
    // handleUploadFile("activities", values.image, user);
  };

  return (
    <div className="p w-full p-3">
      <CreateActivityForm onSubmit={submitHandler} />
    </div>
  );
};
export default CreateActivityLayout;
