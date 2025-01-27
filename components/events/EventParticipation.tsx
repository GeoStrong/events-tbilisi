"use client";

import React, { useState } from "react";
import Form from "next/form";
import { useFormik } from "formik";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ParticipantValues } from "@/lib/types";

const EventParticipation: React.FC = () => {
  const { isMobile } = useScreenSize();
  const [responseError, setResponseError] = useState<string | null>(null);

  const initialValues: ParticipantValues = {
    name: "",
    email: "",
    phone: "",
    additionalInfo: "",
  };

  const validate = (values: ParticipantValues) => {
    const errors: Partial<ParticipantValues> = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (values.phone && !/^\d{9}$/i.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponseError(null);

      if (!response.ok) {
        setResponseError(response.statusText);
      }

      console.log(await response.json());
    },
  });

  return (
    <>
      <DrawerNested direction={isMobile ? "bottom" : "right"}>
        <DrawerTrigger>
          <Button className="h-12 w-full text-lg text-white">
            Participate
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full md:w-2/6">
          <DrawerHeader>
            <DrawerTitle className="mb-3 text-center text-xl">
              <span className="linear-light">Who are you?</span>
              😃
            </DrawerTitle>
            <DrawerDescription className="text-base">
              Let the event host know who you are by signing up.
            </DrawerDescription>
            <Form
              action=""
              //   action="/app/api/route.ts"
              onSubmit={formik.handleSubmit}
              className="mt-5 flex flex-col gap-3"
            >
              {responseError && <p className="text-red-500">{responseError}</p>}
              <div className="flex flex-col gap-2">
                {formik.errors.name ? (
                  <span className="pl-1 text-left text-xs text-red-500">
                    {formik.errors.name}
                  </span>
                ) : null}
                <Input
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={`border border-gray-300 p-4 dark:border-gray-700 ${formik.errors.name ? "!border-red-500" : ""} h-12 w-full rounded-2xl`}
                />
              </div>
              <div className="flex flex-col gap-2">
                {formik.errors.email ? (
                  <span className="pl-1 text-left text-xs text-red-500">
                    {formik.errors.email}
                  </span>
                ) : null}
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`border border-gray-300 p-4 dark:border-gray-700 ${formik.errors.email ? "!border-red-500" : ""} h-12 w-full rounded-2xl`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`pl-1 text-left text-xs ${formik.errors.phone ? "text-red-500" : "text-gray-500"}`}
                >
                  {formik.errors.phone || "(Optional)"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="linear-dark text-lg">+995</span>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className={`border border-gray-300 p-4 dark:border-gray-700 ${formik.errors.phone ? "!border-red-500" : ""} h-12 w-full rounded-2xl`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="pl-1 text-left text-xs text-gray-500">
                  (Optional)
                </span>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  onChange={formik.handleChange}
                  value={formik.values.additionalInfo}
                  className="border border-gray-300 p-4 placeholder:p-0 placeholder:text-sm dark:border-gray-700"
                  placeholder="
                Additional Information...
                "
                />
              </div>
              <div className="mt-4 flex flex-col gap-2 md:flex-row-reverse">
                <Button type="submit" className="h-12 text-base text-white">
                  Sign me up
                </Button>
                <DrawerClose>
                  <Button
                    className="h-12 w-full bg-transparent text-base"
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </Form>
          </DrawerHeader>
        </DrawerContent>
      </DrawerNested>
    </>
  );
};
export default EventParticipation;
