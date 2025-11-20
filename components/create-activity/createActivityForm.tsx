"use client";

import { Form, Field, ErrorMessage, FormikProps } from "formik";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { EventCategories, NewEventEntity } from "@/lib/types";
import { categories } from "@/lib/data/categories";
import { useEffect } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

interface CreateActivityProps {
  formik: FormikProps<NewEventEntity>;
  imagePreview: string | null;
  handleImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  latLng: google.maps.LatLngLiteral | null;
  handleOpenMobileMap: () => void;
  displayOpenMapButton: boolean;
  styles?: string;
}

const CreateActivityForm: React.FC<CreateActivityProps> = ({
  formik,
  imagePreview,
  handleImagePreview,
  latLng,
  handleOpenMobileMap,
  displayOpenMapButton,
  styles,
}) => {
  useEffect(() => {
    if (latLng) {
      formik.setFieldValue("googleLocation", latLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latLng]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      handleImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form className="h-full">
      <div className={`mb-3 space-y-4 overflow-y-scroll p-3 ${styles}`}>
        {/* Title */}
        <div>
          <label htmlFor="title">Title *</label>
          <Field
            className="dark:border-gray-600"
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
            className="dark:border-gray-600"
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
            className="dark:border-gray-600"
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

          <Field
            as={Input}
            id="time"
            name="time"
            type="time"
            className="dark:border-gray-600"
          />

          <ErrorMessage
            name="time"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime">End Time</label>

          <Field
            as={Input}
            id="endTime"
            name="endTime"
            type="time"
            className="dark:border-gray-600"
          />

          <ErrorMessage
            name="endTime"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location">Address *</label>
          <Field
            className="dark:border-gray-600"
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

        {/* Google Location */}
        <div className="flex flex-col">
          <label htmlFor="googleLocation">Google Coordinates *</label>
          <div className="relative">
            <Input
              className="p-3 dark:border-gray-600"
              id="googleLocation"
              name="googleLocation"
              placeholder="Please select on the map"
              disabled={true}
              value={
                latLng
                  ? `lat: ${latLng?.lat}, lng: ${latLng?.lng}`
                  : "Please select on the map"
              }
            />
            {displayOpenMapButton && (
              <button
                type="button"
                className="absolute right-4 top-[0.35rem] rounded-lg border bg-primary px-2 py-1"
                onClick={handleOpenMobileMap}
              >
                <FaMapMarkedAlt className="text-white" />
              </button>
            )}
          </div>
          <ErrorMessage
            name="googleLocation"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        {/* Categories */}
        <div>
          <label htmlFor="categories">Select categories * (max 3)</label>

          <div className="mt-2 flex flex-wrap gap-3">
            {categories.map((category) => {
              const selected =
                formik.values.categories &&
                formik.values.categories.includes(
                  category.id as EventCategories,
                );

              return (
                <Button
                  key={category.id}
                  type="button"
                  className={`${
                    selected &&
                    "bg-primary text-white hover:bg-primary/90 hover:text-white"
                  } border text-sm dark:border-gray-600`}
                  variant="ghost"
                  onClick={() => {
                    if (selected) {
                      formik.setFieldValue(
                        "categories",
                        formik.values.categories &&
                          formik.values.categories.filter(
                            (c) => c !== category.id,
                          ),
                      );
                    } else {
                      // Add category (max 3)
                      if (
                        formik.values.categories &&
                        formik.values.categories.length < 3
                      ) {
                        formik.setFieldValue("categories", [
                          ...(formik.values.categories &&
                            formik.values.categories),
                          category.id,
                        ]);
                      }
                    }
                  }}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>

          <ErrorMessage
            name="categories"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        {/* Link */}
        <div>
          <label htmlFor="link">Link</label>
          <Field
            className="dark:border-gray-600"
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
            className="dark:border-gray-600"
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
            className="dark:border-gray-600"
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
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            className="dark:border-gray-600"
          />
          {imagePreview && (
            <Image
              src={imagePreview || ""}
              alt="Preview"
              width={100}
              height={100}
              className="mt-2 h-32 w-32 rounded-md object-cover"
            />
          )}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Submitting..." : "Create Activity"}
      </Button>
    </Form>
  );
};

export default CreateActivityForm;
