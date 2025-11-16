"use client";

import React from "react";
import CreateActivityForm from "./createActivityForm";
import { EventEntity } from "@/lib/types";

const CreateActivityLayout: React.FC = () => {
  const submitHandler = (values: EventEntity) => {
    console.log(values);
  };

  return (
    <div className="w-full p-6">
      <CreateActivityForm onSubmit={submitHandler} />
    </div>
  );
};
export default CreateActivityLayout;
