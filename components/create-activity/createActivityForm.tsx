"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { NewEventEntity } from "@/lib/types";
import { toast } from "sonner";

interface CreateActivityProps {
  onSubmit: (values: NewEventEntity) => void;
}

const CreateActivityForm: React.FC<CreateActivityProps> = ({ onSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: NewEventEntity = {
    title: "",
    description: "",
    date: null,
    time: "",
    endTime: "",
    location: "",
    link: null,
    image: "",
    targetAudience: null,
    maxAttendees: null,
    host: "individual",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          onSubmit(values);
          resetForm();
          setImagePreview(null);
          toast.success("You posted a new activity");
        } catch (err) {
          console.error(err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="h-full">
          <div className="mb-3 h-1/2 space-y-4 overflow-y-scroll p-3">
            {/* Title */}
            <div>
              <label htmlFor="title">Title *</label>
              <Field
                as={Input}
                id="title"
                name="title"
                placeholder="Event title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description">Description *</label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Event description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date">Date *</label>
              <Field
                as={Input}
                id="date"
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time">Time *</label>
              <Field as={Input} id="time" name="time" type="time" />
              <ErrorMessage
                name="time"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label htmlFor="endTime">End Time</label>
              <Field as={Input} id="endTime" name="endTime" type="time" />
              <ErrorMessage
                name="endTime"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location">Location *</label>
              <Field
                as={Input}
                id="location"
                name="location"
                placeholder="Event location"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link">Link</label>
              <Field
                as={Input}
                id="link"
                name="link"
                placeholder="Optional URL"
                type="url"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label htmlFor="targetAudience">Target Audience</label>
              <Field
                as={Input}
                id="targetAudience"
                name="targetAudience"
                placeholder="e.g., Adults, Students"
              />
            </div>

            {/* Max Attendees */}
            <div>
              <label htmlFor="maxAttendees">Max Attendees</label>
              <Field
                as={Input}
                id="maxAttendees"
                name="maxAttendees"
                type="number"
                min={1}
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="mt-2 h-32 w-32 rounded-md object-cover"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Activity"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateActivityForm;
