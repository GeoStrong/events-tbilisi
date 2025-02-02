import Form from "next/form";
import React from "react";
import { Input } from "../ui/input";

const CreateEventForm: React.FC = () => {
  return (
    <Form action="" className="p-3">
      <Input
        type="text"
        name="eventName"
        id="eventName"
        placeholder="Event Name"
        className="h-12 rounded-lg"
      />
    </Form>
  );
};
export default CreateEventForm;
